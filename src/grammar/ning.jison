%lex

%%
\s+ /* skip whitespace */ yy.recordTokenLocationBasedOnCurrentMatch();
\/\/[^\n]* /* skip comments */ yy.recordTokenLocationBasedOnCurrentMatch();
"(" yy.recordTokenLocationBasedOnCurrentMatch(); return "LPAREN";
")" yy.recordTokenLocationBasedOnCurrentMatch(); return "RPAREN";
"[" yy.recordTokenLocationBasedOnCurrentMatch(); return "LSQUARE";
"]" yy.recordTokenLocationBasedOnCurrentMatch(); return "RSQUARE";
"{" yy.recordTokenLocationBasedOnCurrentMatch(); return "LCURLY";
"}" yy.recordTokenLocationBasedOnCurrentMatch(); return "RCURLY";
";" yy.recordTokenLocationBasedOnCurrentMatch(); return "SEMICOLON";
\"(?:[^"{}]|\{0x[0-9a-fA-F]+\})*\" yy.recordTokenLocationBasedOnCurrentMatch(); return "STRING_LITERAL";
"Command" yy.recordTokenLocationBasedOnCurrentMatch(); return "COMMAND_KW";
"Query" yy.recordTokenLocationBasedOnCurrentMatch(); return "QUERY_KW";
"Global" yy.recordTokenLocationBasedOnCurrentMatch(); return "GLOBAL_KW";
"Number" yy.recordTokenLocationBasedOnCurrentMatch(); return "NUMBER_KW";
"String" yy.recordTokenLocationBasedOnCurrentMatch(); return "STRING_KW";
"Boolean" yy.recordTokenLocationBasedOnCurrentMatch(); return "BOOLEAN_KW";
NaN|Infinity|[-]Infinity|[^\s()[\]{};A-Z"]+ yy.recordTokenLocationBasedOnCurrentMatch(); return "IDENTIFIER"
<<EOF>> yy.recordTokenLocationBasedOnCurrentMatch(); return 'EOF';

/lex

%start file

%%

file
    : zeroOrMoreDefs EOF
        { return $1; }
;

zeroOrMoreDefs
    : zeroOrMoreDefs def
        { $$ = $1; $$.push($2); }
    | /* empty */
        { $$ = []; }
    ;

def : commandDef
    | queryDef
    | globalDef
    ;

commandDef
    : commandKw lparen zeroOrMoreFuncHeaderParts rparen blockCommand
        { $$ = { location: @$, kind: "command_def", commandKw: $1, lparen: $2, header: $3, rparen: $4, body: $5 }; }
;

queryDef
    : type_ queryKw lparen zeroOrMoreFuncHeaderParts rparen blockCommand
        { $$ = { location: @$, kind: "query_def", returnType: $1, queryKw: $2, lparen: $3, header: $4, rparen: $5, body: $6 }; }
;

globalDef
    : globalKw blockCommand
        { $$ = { location: @$, kind: "global_def", globalKw: $1, body: $2 }; }
;

zeroOrMoreFuncHeaderParts
    : zeroOrMoreFuncHeaderParts funcHeaderPart
        { $$ = $1; $$.push($2); }
    | /* empty */
        { $$ = []; }
;

funcHeaderPart
    : identifier
    | lparen type_ oneOrMoreIdentifiers rparen
        { $$ = { location: @$, kind: "func_param_def", lparen: $1, paramType: $2, name: $3, rparen: $4 }; }
;

oneOrMoreIdentifiers
    : identifier
        { $$ = [$1]; }
    | oneOrMoreIdentifiers identifier
        { $$ = $1; $$.push($2); }
;

blockCommand
    : lcurly zeroOrMoreCommands rcurly
        { $$ = { location: @$, kind: "block_command", lcurly: $1, commands: $2, rcurly: $3 }; }
;

zeroOrMoreCommands
    : zeroOrMoreCommands command
        { $$ = $1; $$.push($2); }
    | /* empty */
        { $$ = []; }
;

command
    : zeroOrMoreCommandParts semicolon
        { $$ = { location: @$, kind: "command", parts: $1, semicolon: $2 }; }
;

zeroOrMoreCommandParts
    : zeroOrMoreCommandParts commandPart
        { $$ = $1; $$.push($2); }
    | /* empty */
        { $$ = []; }
;

commandPart
    : identifier
    | parenthesizedExpression
    | squareBracketedIdentifierSequence
    | blockCommand
;

parenthesizedExpression
    : lparen expression rparen
        { $$ = { location: @$, kind: "parenthesized_expression", lparen: $1, expression: $2, rparen: $3 }; }
;

squareBracketedIdentifierSequence
    : lsquare oneOrMoreIdentifiers rsquare
        { $$ = { location: @$, kind: "square_bracketed_identifier_sequence", lsquare: $1, identifiers: $2, rsquare: $3 }; }
;

expression
    : stringLiteral
    | compoundExpression
;

compoundExpression
    : zeroOrMoreCompoundExpressionParts
        { $$ = { location: @$, kind: "compound_expression", parts: $1 }; }
;

zeroOrMoreCompoundExpressionParts
    : zeroOrMoreCompoundExpressionParts compoundExpressionPart
        { $$ = $1; $$.push($2); }
    | /* empty */
        { $$ = []; }
;

compoundExpressionPart
    : identifier
    | parenthesizedExpression
    | squareBracketedIdentifierSequence
;

type_
    : numberKw
        { $$ = { location: @$, kind: "type", tokens: [$1], value: "number" }; }
    | stringKw
        { $$ = { location: @$, kind: "type", tokens: [$1], value: "string" }; }
    | booleanKw
        { $$ = { location: @$, kind: "type", tokens: [$1], value: "boolean" }; }
;

lparen
    : LPAREN
        { $$ = { location: @$, kind: "lparen" }; }
;

rparen
    : RPAREN
        { $$ = { location: @$, kind: "rparen" }; }
;

lsquare
    : LSQUARE
        { $$ = { location: @$, kind: "lsquare" }; }
;

rsquare
    : RSQUARE
        { $$ = { location: @$, kind: "rsquare" }; }
;

lcurly
    : LCURLY
        { $$ = { location: @$, kind: "lcurly" }; }
;

rcurly
    : RCURLY
        { $$ = { location: @$, kind: "rcurly" }; }
;

semicolon
    : SEMICOLON
        { $$ = { location: @$, kind: "semicolon" }; }
;

stringLiteral
    : STRING_LITERAL
        { $$ = { location: @$, kind: "string_literal", source: $1 }; }
;

commandKw
    : COMMAND_KW
        { $$ = { location: @$, kind: "command_kw" }; }
;

queryKw
    : QUERY_KW
        { $$ = { location: @$, kind: "query_kw" }; }
;

globalKw
    : GLOBAL_KW
        { $$ = { location: @$, kind: "global_kw" }; }
;

numberKw
    : NUMBER_KW
        { $$ = { location: @$, kind: "number_kw" }; }
;

stringKw
    : STRING_KW
        { $$ = { location: @$, kind: "string_kw" }; }
;

booleanKw
    : BOOLEAN_KW
        { $$ = { location: @$, kind: "boolean_kw" }; }
;

identifier
    : IDENTIFIER
        { $$ = { location: @$, kind: "identifier", name: $1 }; }
;
