const replaceInFile = require("replace-in-file");
const path = require("path");

const PATH_TO_GENERATED_PARSER = path.join(
  __dirname,
  "../src/parser/parser.generated.js"
);

replaceInFile.sync({
  files: PATH_TO_GENERATED_PARSER,
  from: /\(yylineno \+ 1\)/g,
  to: "lexer.yylineno",
});
