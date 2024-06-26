import type * as ast from "./types/tysonTypeDict";

export function getQueryInputs(
  expr: ast.CompoundExpression
): [ast.ParenthesizedExpression[], ast.SquareBracketedIdentifierSequence[]] {
  const args: ast.ParenthesizedExpression[] = [];
  const squares: ast.SquareBracketedIdentifierSequence[] = [];
  for (const part of expr.parts) {
    if (part.kind === "identifier") {
      continue;
    }

    if (part.kind === "parenthesized_expression") {
      args.push(part);
      continue;
    }

    if (part.kind === "square_bracketed_identifier_sequence") {
      squares.push(part);
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exhaustivenessCheck: never = part;
  }
  return [args, squares];
}

export function getCommandInputs(
  command: ast.Command
): [
  ast.ParenthesizedExpression[],
  ast.SquareBracketedIdentifierSequence[],
  ast.BlockCommand[]
] {
  const args: ast.ParenthesizedExpression[] = [];
  const squares: ast.SquareBracketedIdentifierSequence[] = [];
  const blockCommands: ast.BlockCommand[] = [];
  for (const part of command.parts) {
    if (part.kind === "identifier") {
      continue;
    }

    if (part.kind === "parenthesized_expression") {
      args.push(part);
      continue;
    }

    if (part.kind === "square_bracketed_identifier_sequence") {
      squares.push(part);
      continue;
    }

    if (part.kind === "block_command") {
      blockCommands.push(part);
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exhaustivenessCheck: never = part;
  }
  return [args, squares, blockCommands];
}
