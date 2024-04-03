import { getCommandApplicationArgsAndSquaresAndBlockCommands } from "./funcApplicationInputs";
import {
  getUntypedCommandApplicationSignatureString,
  getUntypedFunctionSignatureString,
  stringifyIdentifierSequence,
} from "./funcSignatureString";
import { TysonTypeDict } from "./types/tysonTypeDict";
import type * as ast from "./types/tysonTypeDict";
import { UNTYPED_BUILTINS } from "./untypedBuiltins";

export type NingTypeError =
  | GlobalDefNotFirstError
  | MultipleGlobalDefsError
  | NameClashError
  | IllegalCommandInGlobalDefError
  | IllegalCommandInQueryDefError
  | QueryCommandMutatesGlobalVariableError
  | QueryDefBodyLacksInevitableReturnError;

export enum TypeErrorKind {
  GlobalDefNotFirst = "global_def_not_first",
  MultipleGlobalDefs = "multiple_global_defs",
  NameClash = "name_clash",
  IllegalCommandInGlobalDef = "illegal_command_in_global_def",
  IllegalCommandInQueryDef = "illegal_command_in_query_def",
  QueryCommandMutatesGlobalVariable = "query_command_mutates_global_variable",
  QueryDefBodyLacksInevitableReturn = "query_def_body_lacks_inevitable_return",
}

export interface GlobalDefNotFirstError {
  kind: TypeErrorKind.GlobalDefNotFirst;
}

export interface MultipleGlobalDefsError {
  kind: TypeErrorKind.MultipleGlobalDefs;
}

export interface NameClashError {
  kind: TypeErrorKind.NameClash;
  existingDef: NameDef;
  newDef: NameDef;
}

export interface IllegalCommandInGlobalDefError {
  kind: TypeErrorKind.IllegalCommandInGlobalDef;
  command: ast.Command;
}

export interface IllegalCommandInQueryDefError {
  kind: TypeErrorKind.IllegalCommandInQueryDef;
  command: ast.Command;
}

export interface QueryCommandMutatesGlobalVariableError {
  kind: TypeErrorKind.QueryCommandMutatesGlobalVariable;
  command: ast.Command;
  globalVariableDef: NameDef;
}

export interface QueryDefBodyLacksInevitableReturnError {
  kind: TypeErrorKind.QueryDefBodyLacksInevitableReturn;
  def: ast.QueryDef;
}

export type NameDef =
  | ast.Command
  | ast.FuncParamDef
  | ast.QueryDef
  | ast.CommandDef;

export function typecheck(file: TysonTypeDict["file"]): NingTypeError[] {
  return new Typechecker(file).typecheck();
}

const LEGAL_GLOBAL_DEF_BODY_COMMAND_SIGNATURE_STRINGS: Set<string> = new Set([
  UNTYPED_BUILTINS.let_.signature.join(" "),
  UNTYPED_BUILTINS.var_.signature.join(" "),
  UNTYPED_BUILTINS.numberListCreate.signature.join(" "),
  UNTYPED_BUILTINS.stringListCreate.signature.join(" "),
  UNTYPED_BUILTINS.booleanListCreate.signature.join(" "),
]);

const LEGAL_QUERY_DEF_BODY_COMMAND_SIGNATURE_STRINGS: Set<string> = new Set([
  UNTYPED_BUILTINS.let_.signature.join(" "),
  UNTYPED_BUILTINS.var_.signature.join(" "),
  UNTYPED_BUILTINS.numberListCreate.signature.join(" "),
  UNTYPED_BUILTINS.stringListCreate.signature.join(" "),
  UNTYPED_BUILTINS.booleanListCreate.signature.join(" "),
  UNTYPED_BUILTINS.assign.signature.join(" "),
  UNTYPED_BUILTINS.increase.signature.join(" "),
  UNTYPED_BUILTINS.listReplaceItem.signature.join(" "),
  UNTYPED_BUILTINS.listInsert.signature.join(" "),
  UNTYPED_BUILTINS.listDeleteItem.signature.join(" "),
  UNTYPED_BUILTINS.listDeleteAll.signature.join(" "),
  UNTYPED_BUILTINS.listAdd.signature.join(" "),
  UNTYPED_BUILTINS.repeat.signature.join(" "),
  UNTYPED_BUILTINS.if_.signature.join(" "),
  UNTYPED_BUILTINS.ifElse.signature.join(" "),
  UNTYPED_BUILTINS.valReturn.signature.join(" "),
]);

/**
 * This set only includes "leaf" commands, not
 * commands like `if` which contain subcommands.
 */
const LEGAL_QUERY_DEF_BODY_MUTATING_LEAF_COMMAND_SIGNATURE_STRINGS: Set<string> =
  new Set([
    UNTYPED_BUILTINS.assign.signature.join(" "),
    UNTYPED_BUILTINS.increase.signature.join(" "),
    UNTYPED_BUILTINS.listReplaceItem.signature.join(" "),
    UNTYPED_BUILTINS.listInsert.signature.join(" "),
    UNTYPED_BUILTINS.listDeleteItem.signature.join(" "),
    UNTYPED_BUILTINS.listDeleteAll.signature.join(" "),
    UNTYPED_BUILTINS.listAdd.signature.join(" "),
  ]);

class Typechecker {
  errors: NingTypeError[];
  stack: StackEntry[];
  userQueryDefs: Map<string, ast.QueryDef>;
  userCommandDefs: Map<string, ast.CommandDef>;

  constructor(private file: TysonTypeDict["file"]) {
    this.errors = [];
    this.stack = [getEmptyStackEntry()];
    this.userQueryDefs = new Map();
    this.userCommandDefs = new Map();
  }

  reset(): void {
    this.errors = [];
    this.stack = [getEmptyStackEntry()];
    this.userQueryDefs = new Map();
    this.userCommandDefs = new Map();
  }

  typecheck(): NingTypeError[] {
    this.reset();
    this.checkAndRegisterGlobalDefs();
    this.checkAndRegisterQueryDefs();
    this.checkAndRegisterCommandDefs();
    return this.errors;
  }

  checkAndRegisterGlobalDefs(): void {
    const globalDefs: ast.GlobalDef[] = this.file.filter(isGlobalDef);

    if (globalDefs.length >= 2) {
      this.errors.push({ kind: TypeErrorKind.MultipleGlobalDefs });
    }

    if (globalDefs.length > 0 && this.file[0].kind !== "global_def") {
      this.errors.push({ kind: TypeErrorKind.GlobalDefNotFirst });
    }

    for (const def of globalDefs) {
      this.checkAndRegisterGlobalDef(def);
    }
  }

  checkAndRegisterGlobalDef(def: ast.GlobalDef): void {
    for (const command of def.body.commands) {
      this.checkCommand(command, null);
      this.checkCommandIsLegalGlobalDefBodyCommand(command);
    }
  }

  checkCommandIsLegalGlobalDefBodyCommand(command: ast.Command): void {
    const sigString = getUntypedCommandApplicationSignatureString(command);
    if (!LEGAL_GLOBAL_DEF_BODY_COMMAND_SIGNATURE_STRINGS.has(sigString)) {
      this.errors.push({
        kind: TypeErrorKind.IllegalCommandInGlobalDef,
        command,
      });
    }
  }

  checkAndRegisterQueryDefs(): void {
    for (const def of this.file) {
      if (def.kind === "query_def") {
        this.checkAndRegisterQueryDef(def);
      }
    }
  }

  checkAndRegisterQueryDef(def: ast.QueryDef): void {
    this.checkFuncDefSignatureIsAvailable(def);
    this.checkFuncDefSignatureParamNamesAreValid(def.signature);
    this.stack.push(getStackEntryWithUncheckedSignatureParams(def.signature));

    for (const command of def.body.commands) {
      this.checkCommand(command, def.returnType.value);
      this.checkCommandIsLegalQueryDefBodyCommand(command);
    }

    this.checkQueryDefBodyHasInevitableReturn(def);

    this.stack.pop();

    this.userQueryDefs.set(
      getUntypedFunctionSignatureString(def.signature),
      def
    );
  }

  checkFuncDefSignatureIsAvailable(
    funcDef: ast.QueryDef | ast.CommandDef
  ): void {
    const sigString = getUntypedFunctionSignatureString(funcDef.signature);

    const conflictingVar = this.lookupVar(sigString);
    if (conflictingVar !== null) {
      this.errors.push({
        kind: TypeErrorKind.NameClash,
        existingDef: conflictingVar.def,
        newDef: funcDef,
      });
      return;
    }

    const conflictingList = this.lookupList(sigString);
    if (conflictingList !== null) {
      this.errors.push({
        kind: TypeErrorKind.NameClash,
        existingDef: conflictingList.def,
        newDef: funcDef,
      });
      return;
    }

    const conflictingUserQueryDef = this.userQueryDefs.get(sigString);
    if (conflictingUserQueryDef !== undefined) {
      this.errors.push({
        kind: TypeErrorKind.NameClash,
        existingDef: conflictingUserQueryDef,
        newDef: funcDef,
      });
      return;
    }

    const conflictingUserCommandDef = this.userCommandDefs.get(sigString);
    if (conflictingUserCommandDef !== undefined) {
      this.errors.push({
        kind: TypeErrorKind.NameClash,
        existingDef: conflictingUserCommandDef,
        newDef: funcDef,
      });
      return;
    }
  }

  checkFuncDefSignatureParamNamesAreValid(
    signature: readonly ast.FuncSignaturePart[]
  ): void {
    const paramDefMap = new Map<string, ast.FuncParamDef>();

    for (const part of signature) {
      if (part.kind === "identifier") {
        continue;
      }

      const name = stringifyIdentifierSequence(part.name);

      const conflictingVar = this.lookupVar(name);
      if (conflictingVar !== null) {
        this.errors.push({
          kind: TypeErrorKind.NameClash,
          existingDef: conflictingVar.def,
          newDef: part,
        });
        return;
      }

      const conflictingList = this.lookupList(name);
      if (conflictingList !== null) {
        this.errors.push({
          kind: TypeErrorKind.NameClash,
          existingDef: conflictingList.def,
          newDef: part,
        });
        return;
      }

      const conflictingUserQueryDef = this.userQueryDefs.get(name);
      if (conflictingUserQueryDef !== undefined) {
        this.errors.push({
          kind: TypeErrorKind.NameClash,
          existingDef: conflictingUserQueryDef,
          newDef: part,
        });
        return;
      }

      const conflictingUserCommandDef = this.userCommandDefs.get(name);
      if (conflictingUserCommandDef !== undefined) {
        this.errors.push({
          kind: TypeErrorKind.NameClash,
          existingDef: conflictingUserCommandDef,
          newDef: part,
        });
        return;
      }

      const conflictingParamDef = paramDefMap.get(name);
      if (conflictingParamDef !== undefined) {
        this.errors.push({
          kind: TypeErrorKind.NameClash,
          existingDef: conflictingParamDef,
          newDef: part,
        });
        return;
      }

      paramDefMap.set(name, part);
    }
  }

  /**
   * You can only use a limited subset of commands within a query:
   * - `let` and `var`
   * - `create <number|string|boolean> list`
   * - LOCAL variable and list mutation, excluding parameters.
   * - You CANNOT mutate parameters.
   * - `repeat #() times`
   * - `if` and `if else`
   * - `return`
   */
  checkCommandIsLegalQueryDefBodyCommand(command: ast.Command): void {
    this.checkCommandUntypedSignatureIsLegalQueryBodyCommandSignature(command);
    this.checkCommandDoesNotMutateGlobaVariables(command);
  }

  checkCommandUntypedSignatureIsLegalQueryBodyCommandSignature(
    command: ast.Command
  ): void {
    const sigString = getUntypedCommandApplicationSignatureString(command);
    if (!LEGAL_QUERY_DEF_BODY_COMMAND_SIGNATURE_STRINGS.has(sigString)) {
      this.errors.push({
        kind: TypeErrorKind.IllegalCommandInQueryDef,
        command,
      });
    }
  }

  checkCommandDoesNotMutateGlobaVariables(command: ast.Command): void {
    const sigString = getUntypedCommandApplicationSignatureString(command);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_args, squares, blockCommands] =
      getCommandApplicationArgsAndSquaresAndBlockCommands(command);

    if (sigString === UNTYPED_BUILTINS.if_.signature.join(" ")) {
      this.checkBlockCommandDoesNotMutateGlobalVariables(blockCommands[0]);
      return;
    }

    if (sigString === UNTYPED_BUILTINS.ifElse.signature.join(" ")) {
      this.checkBlockCommandDoesNotMutateGlobalVariables(blockCommands[0]);
      this.checkBlockCommandDoesNotMutateGlobalVariables(blockCommands[1]);
      return;
    }

    if (sigString === UNTYPED_BUILTINS.repeat.signature.join(" ")) {
      this.checkBlockCommandDoesNotMutateGlobalVariables(blockCommands[0]);
      return;
    }

    if (
      !LEGAL_QUERY_DEF_BODY_MUTATING_LEAF_COMMAND_SIGNATURE_STRINGS.has(
        sigString
      )
    ) {
      return;
    }

    // Every mutating leaf command that is legal in a query body
    // has exactly one square bracketed identifier sequence,
    // so we can safely assume the target is at index 0.
    const targetName = stringifyIdentifierSequence(squares[0].identifiers);

    const definingStackEntryIndex =
      this.indexOfStackEntryThatDefinesVar(targetName);
    if (definingStackEntryIndex === -1) {
      // If the variable is not defined, we won't complain.
      return;
    }

    if (definingStackEntryIndex === 0) {
      this.errors.push({
        kind: TypeErrorKind.QueryCommandMutatesGlobalVariable,
        command,
        globalVariableDef: this.stack[0].variables.get(targetName)!.def,
      });
    }
  }

  checkBlockCommandDoesNotMutateGlobalVariables(
    blockCommand: ast.BlockCommand
  ): void {
    for (const command of blockCommand.commands) {
      this.checkCommandDoesNotMutateGlobaVariables(command);
    }
  }

  checkQueryDefBodyHasInevitableReturn(def: ast.QueryDef): void {
    const hasInevitableReturn = this.doesBlockCommandHaveInevitableReturn(
      def.body
    );
    if (!hasInevitableReturn) {
      this.errors.push({
        kind: TypeErrorKind.QueryDefBodyLacksInevitableReturn,
        def,
      });
    }
  }

  doesBlockCommandHaveInevitableReturn(
    blockCommand: ast.BlockCommand
  ): boolean {
    for (const command of blockCommand.commands) {
      if (this.doesCommandHaveInevitableReturn(command)) {
        return true;
      }
    }
    return false;
  }

  doesCommandHaveInevitableReturn(command: ast.Command): boolean {
    const sigString = getUntypedCommandApplicationSignatureString(command);

    if (
      sigString === UNTYPED_BUILTINS.valReturn.signature.join(" ") ||
      sigString === UNTYPED_BUILTINS.voidReturn.signature.join(" ")
    ) {
      return true;
    }

    if (sigString === UNTYPED_BUILTINS.ifElse.signature.join(" ")) {
      const blockCommands =
        getCommandApplicationArgsAndSquaresAndBlockCommands(command)[2];
      return (
        this.doesBlockCommandHaveInevitableReturn(blockCommands[0]) &&
        this.doesBlockCommandHaveInevitableReturn(blockCommands[1])
      );
    }

    return false;
  }

  checkAndRegisterCommandDefs(): void {
    // We need to check and register the signatures before we
    // check the bodies so that recursive references
    // (possibly including mutually recursive references)
    // will work properly.
    this.checkAndRegisterCommandDefSignatures();
    this.checkCommandDefBodies();
  }

  checkAndRegisterCommandDefSignatures(): void {
    for (const def of this.file) {
      if (def.kind === "command_def") {
        this.checkAndRegisterCommandDefSignature(def);
      }
    }
  }

  checkAndRegisterCommandDefSignature(def: ast.CommandDef): void {
    this.checkFuncDefSignatureIsAvailable(def);
    this.checkFuncDefSignatureParamNamesAreValid(def.signature);
    this.userCommandDefs.set(
      getUntypedFunctionSignatureString(def.signature),
      def
    );
  }

  checkCommandDefBodies(): void {
    for (const def of this.file) {
      if (def.kind === "command_def") {
        this.checkCommandDefBody(def);
      }
    }
  }

  checkCommandDefBody(def: ast.CommandDef): void {
    this.stack.push(getStackEntryWithUncheckedSignatureParams(def.signature));

    for (const command of def.body.commands) {
      this.checkCommand(command, null);
    }

    this.stack.pop();
  }

  checkCommand(
    command: ast.Command,
    expectedReturnType: null | ast.NingType
  ): void {
    const sigString = getUntypedCommandApplicationSignatureString(command);
    const [args, squares, blockCommands] =
      getCommandApplicationArgsAndSquaresAndBlockCommands(command);

    const argTypes: (ast.NingType | null)[] = args.map((arg) =>
      this.checkExpressionAndGetType(arg)
    );

    const squareTypes: (SquareType | null)[] = squares.map((square) =>
      this.checkSquareAndGetType(square)
    );

    for (const blockCommand of blockCommands) {
      this.checkBlockCommand(blockCommand, expectedReturnType);
    }

    const typePossibilities =
      this.lookupCommandArgAndSquareTypePossibilities(sigString);

    if (sigString === UNTYPED_BUILTINS.valReturn.signature.join(" ")) {
      // TODO: Check return type.
    } else if (sigString === UNTYPED_BUILTINS.voidReturn.signature.join(" ")) {
      // TODO: Check return type.
    }

    if (typePossibilities.length === 0) {
      // TODO: Could not find command signature.
      this.errors.push({});
      return;
    }

    const attemptedOverload = guessAttemptedOverload(
      typePossibilities,
      argTypes,
      squareTypes
    );
  }

  checkBlockCommand(
    blockCommand: ast.BlockCommand,
    expectedReturnType: null | ast.NingType
  ): void {
    for (const command of blockCommand.commands) {
      this.checkCommand(command, expectedReturnType);
    }
  }

  checkExpressionAndGetType(expr: ast.Expression): ast.NingType | null {
    // TODO
    return null;
  }

  checkSquareAndGetType(
    square: ast.SquareBracketedIdentifierSequence
  ): SquareType | null {
    // TODO
    const name = stringifyIdentifierSequence(square.identifiers);

    for (let i = this.stack.length - 1; i >= 0; --i) {
      const entry = this.stack[i];
      const info = entry.variables.get(name);
      if (info !== undefined) {
        return { isList: false, typeOrElementType: info.valType };
      }
    }

    for (let i = this.stack.length - 1; i >= 0; --i) {
      const entry = this.stack[i];
      const info = entry.lists.get(name);
      if (info !== undefined) {
        return { isList: true, typeOrElementType: info.elementType };
      }
    }

    return null;
  }

  lookupVar(name: string): VariableInfo | null {
    for (let i = this.stack.length - 1; i >= 0; --i) {
      const entry = this.stack[i];
      const info = entry.variables.get(name);
      if (info !== undefined) {
        return info;
      }
    }
    return null;
  }

  indexOfStackEntryThatDefinesVar(name: string): number {
    for (let i = this.stack.length - 1; i >= 0; --i) {
      const entry = this.stack[i];
      const info = entry.variables.get(name);
      if (info !== undefined) {
        return i;
      }
    }
    return -1;
  }

  lookupList(name: string): ListInfo | null {
    for (let i = this.stack.length - 1; i >= 0; --i) {
      const entry = this.stack[i];
      const info = entry.lists.get(name);
      if (info !== undefined) {
        return info;
      }
    }
    return null;
  }

  lookupCommandArgAndSquareTypePossibilities(
    sigString: string
  ): CommandArgAndSquareTypePossibility[] {
    // TODO
    return [];
  }
}

function isGlobalDef(def: ast.Def): def is ast.GlobalDef {
  return def.kind === "global_def";
}

interface StackEntry {
  variables: Map<string, VariableInfo>;
  lists: Map<string, ListInfo>;
}

interface VariableInfo {
  valType: ast.NingType;
  mutable: boolean;
  def: NameDef;
}

interface ListInfo {
  elementType: ast.NingType;
  def: ast.Command;
}

interface CommandArgAndSquareTypePossibility {
  argTypes: ast.NingType[];
  squareTypes: ast.NingType[];
}

interface SquareType {
  isList: boolean;
  typeOrElementType: ast.NingType;
}

function getEmptyStackEntry(): StackEntry {
  return { variables: new Map(), lists: new Map() };
}

function getStackEntryWithUncheckedSignatureParams(
  signature: readonly ast.FuncSignaturePart[]
): StackEntry {
  const variables = new Map<string, VariableInfo>();

  for (const part of signature) {
    if (part.kind === "func_param_def") {
      variables.set(stringifyIdentifierSequence(part.name), {
        valType: part.paramType.value,
        mutable: false,
        def: part,
      });
    }
  }

  return { variables, lists: new Map() };
}

// Difference between commands and queries:
// - Commands have side effects, but do not return a value.
//   Commands may not terminate.
// - Queries return a value, and have no side effects.
//   Queries always terminate.
//   However, queries may not be "pure" in the sense that they
//   may return different outputs for the same inputs.
//   You can only use a limited subset of commands within a query:
//   * `let` and `var`
//   * `create <number|string|boolean> list`
//   * LOCAL variable and list mutation, excluding parameters.
//     You CANNOT mutate parameters.
//   * `repeat #() times` (the finite version)
//   * `if` and `else`
//   * `return`
//   Queries have the additional following restrictions:
//   * Queries cannot circularly depend on each other.
//   * Queries must have a return statement covering the end of
//     every possible branch.
