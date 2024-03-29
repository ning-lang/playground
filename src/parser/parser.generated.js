// NOTE: This file was mostly generated by jison,
// but it was slightly modified by hand.
// Specifically, the `exports.main` function was removed,
// because it caused the TypeScript compiler to not be able
// to compile the project.

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function () {
  var o = function (k, v, o, l) {
      for (o = o || {}, l = k.length; l--; o[k[l]] = v);
      return o;
    },
    $V0 = [5, 49, 51, 52, 53, 54],
    $V1 = [1, 16],
    $V2 = [1, 17],
    $V3 = [1, 18],
    $V4 = [1, 20],
    $V5 = [1, 25],
    $V6 = [50, 56],
    $V7 = [1, 27],
    $V8 = [50, 55, 56],
    $V9 = [41, 42, 56],
    $Va = [2, 11],
    $Vb = [41, 43, 45, 46, 47, 56],
    $Vc = [1, 35],
    $Vd = [1, 38],
    $Ve = [41, 43, 45, 47, 56],
    $Vf = [41, 42, 43, 44, 45, 47, 56],
    $Vg = [5, 41, 43, 45, 47, 49, 51, 52, 53, 54, 56],
    $Vh = [1, 56],
    $Vi = [2, 32],
    $Vj = [1, 63],
    $Vk = [42, 56],
    $Vl = [42, 44],
    $Vm = [41, 42, 43, 44, 56];
  var parser = {
    trace: function trace() {},
    yy: {},
    symbols_: {
      error: 2,
      file: 3,
      zeroOrMoreDefs: 4,
      EOF: 5,
      def: 6,
      commandDef: 7,
      queryDef: 8,
      globalDef: 9,
      commandKw: 10,
      lparen: 11,
      zeroOrMoreFuncSignatureParts: 12,
      rparen: 13,
      blockCommand: 14,
      type_: 15,
      queryKw: 16,
      globalKw: 17,
      funcSignaturePart: 18,
      identifier: 19,
      oneOrMoreIdentifiers: 20,
      lcurly: 21,
      zeroOrMoreCommands: 22,
      rcurly: 23,
      command: 24,
      zeroOrMoreCommandParts: 25,
      semicolon: 26,
      commandPart: 27,
      parenthesizedExpression: 28,
      squareBracketedExpression: 29,
      expression: 30,
      lsquare: 31,
      rsquare: 32,
      stringLiteral: 33,
      compoundExpression: 34,
      zeroOrMoreCompoundExpressionParts: 35,
      compoundExpressionPart: 36,
      numberKw: 37,
      stringKw: 38,
      booleanKw: 39,
      listKw: 40,
      LPAREN: 41,
      RPAREN: 42,
      LSQUARE: 43,
      RSQUARE: 44,
      LCURLY: 45,
      RCURLY: 46,
      SEMICOLON: 47,
      STRING_LITERAL: 48,
      COMMAND_KW: 49,
      QUERY_KW: 50,
      GLOBAL_KW: 51,
      NUMBER_KW: 52,
      STRING_KW: 53,
      BOOLEAN_KW: 54,
      LIST_KW: 55,
      IDENTIFIER: 56,
      $accept: 0,
      $end: 1,
    },
    terminals_: {
      2: "error",
      5: "EOF",
      41: "LPAREN",
      42: "RPAREN",
      43: "LSQUARE",
      44: "RSQUARE",
      45: "LCURLY",
      46: "RCURLY",
      47: "SEMICOLON",
      48: "STRING_LITERAL",
      49: "COMMAND_KW",
      50: "QUERY_KW",
      51: "GLOBAL_KW",
      52: "NUMBER_KW",
      53: "STRING_KW",
      54: "BOOLEAN_KW",
      55: "LIST_KW",
      56: "IDENTIFIER",
    },
    productions_: [
      0,
      [3, 2],
      [4, 2],
      [4, 0],
      [6, 1],
      [6, 1],
      [6, 1],
      [7, 5],
      [8, 6],
      [9, 2],
      [12, 2],
      [12, 0],
      [18, 1],
      [18, 4],
      [20, 1],
      [20, 2],
      [14, 3],
      [22, 2],
      [22, 0],
      [24, 2],
      [25, 2],
      [25, 0],
      [27, 1],
      [27, 1],
      [27, 1],
      [27, 1],
      [28, 3],
      [29, 3],
      [30, 1],
      [30, 1],
      [34, 1],
      [35, 2],
      [35, 0],
      [36, 1],
      [36, 1],
      [36, 1],
      [15, 1],
      [15, 1],
      [15, 1],
      [15, 2],
      [15, 2],
      [15, 2],
      [11, 1],
      [13, 1],
      [31, 1],
      [32, 1],
      [21, 1],
      [23, 1],
      [26, 1],
      [33, 1],
      [10, 1],
      [16, 1],
      [17, 1],
      [37, 1],
      [38, 1],
      [39, 1],
      [40, 1],
      [19, 1],
    ],
    performAction: function anonymous(
      yytext,
      yyleng,
      yylineno,
      yy,
      yystate /* action[1] */,
      $$ /* vstack */,
      _$ /* lstack */
    ) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          return $$[$0 - 1];
          break;
        case 2:
        case 10:
        case 15:
        case 17:
        case 20:
        case 31:
          this.$ = $$[$0 - 1];
          this.$.push($$[$0]);
          break;
        case 3:
        case 11:
        case 18:
        case 21:
        case 32:
          this.$ = [];
          break;
        case 7:
          this.$ = {
            location: this._$,
            kind: "command_def",
            commandKw: $$[$0 - 4],
            lparen: $$[$0 - 3],
            signature: $$[$0 - 2],
            rparen: $$[$0 - 1],
            body: $$[$0],
          };
          break;
        case 8:
          this.$ = {
            location: this._$,
            kind: "query_def",
            returnType: $$[$0 - 5],
            queryKw: $$[$0 - 4],
            lparen: $$[$0 - 3],
            signature: $$[$0 - 2],
            rparen: $$[$0 - 1],
            body: $$[$0],
          };
          break;
        case 9:
          this.$ = {
            location: this._$,
            kind: "global_def",
            globalKw: $$[$0 - 1],
            body: $$[$0],
          };
          break;
        case 13:
          this.$ = {
            location: this._$,
            kind: "func_param_def",
            lparen: $$[$0 - 3],
            paramType: $$[$0 - 2],
            name: $$[$0 - 1],
            rparen: $$[$0],
          };
          break;
        case 14:
          this.$ = [$$[$0]];
          break;
        case 16:
          this.$ = {
            location: this._$,
            kind: "block_command",
            lcurly: $$[$0 - 2],
            commands: $$[$0 - 1],
            rcurly: $$[$0],
          };
          break;
        case 19:
          this.$ = {
            location: this._$,
            kind: "command",
            parts: $$[$0 - 1],
            semicolon: $$[$0],
          };
          break;
        case 26:
          this.$ = {
            location: this._$,
            kind: "parenthesized_expression",
            lparen: $$[$0 - 2],
            expression: $$[$0 - 1],
            rparen: $$[$0],
          };
          break;
        case 27:
          this.$ = {
            location: this._$,
            kind: "square_bracketed_expression",
            lsquare: $$[$0 - 2],
            expression: $$[$0 - 1],
            rsquare: $$[$0],
          };
          break;
        case 30:
          this.$ = {
            location: this._$,
            kind: "compound_expression",
            parts: $$[$0],
          };
          break;
        case 36:
          this.$ = {
            location: this._$,
            kind: "type",
            tokens: [$$[$0]],
            value: "number",
          };
          break;
        case 37:
          this.$ = {
            location: this._$,
            kind: "type",
            tokens: [$$[$0]],
            value: "string",
          };
          break;
        case 38:
          this.$ = {
            location: this._$,
            kind: "type",
            tokens: [$$[$0]],
            value: "boolean",
          };
          break;
        case 39:
          this.$ = {
            location: this._$,
            kind: "type",
            tokens: [$$[$0 - 1], $$[$0]],
            value: "number_list",
          };
          break;
        case 40:
          this.$ = {
            location: this._$,
            kind: "type",
            tokens: [$$[$0 - 1], $$[$0]],
            value: "string_list",
          };
          break;
        case 41:
          this.$ = {
            location: this._$,
            kind: "type",
            tokens: [$$[$0 - 1], $$[$0]],
            value: "boolean_list",
          };
          break;
        case 42:
          this.$ = { location: this._$, kind: "lparen" };
          break;
        case 43:
          this.$ = { location: this._$, kind: "rparen" };
          break;
        case 44:
          this.$ = { location: this._$, kind: "lsquare" };
          break;
        case 45:
          this.$ = { location: this._$, kind: "rsquare" };
          break;
        case 46:
          this.$ = { location: this._$, kind: "lcurly" };
          break;
        case 47:
          this.$ = { location: this._$, kind: "rcurly" };
          break;
        case 48:
          this.$ = { location: this._$, kind: "semicolon" };
          break;
        case 49:
          this.$ = {
            location: this._$,
            kind: "string_literal",
            source: $$[$0],
          };
          break;
        case 50:
          this.$ = { location: this._$, kind: "command_kw" };
          break;
        case 51:
          this.$ = { location: this._$, kind: "query_kw" };
          break;
        case 52:
          this.$ = { location: this._$, kind: "global_kw" };
          break;
        case 53:
          this.$ = { location: this._$, kind: "number_kw" };
          break;
        case 54:
          this.$ = { location: this._$, kind: "string_kw" };
          break;
        case 55:
          this.$ = { location: this._$, kind: "boolean_kw" };
          break;
        case 56:
          this.$ = { location: this._$, kind: "list_kw" };
          break;
        case 57:
          this.$ = { location: this._$, kind: "identifier", name: $$[$0] };
          break;
      }
    },
    table: [
      o($V0, [2, 3], { 3: 1, 4: 2 }),
      { 1: [3] },
      {
        5: [1, 3],
        6: 4,
        7: 5,
        8: 6,
        9: 7,
        10: 8,
        15: 9,
        17: 10,
        37: 12,
        38: 13,
        39: 14,
        49: [1, 11],
        51: [1, 15],
        52: $V1,
        53: $V2,
        54: $V3,
      },
      { 1: [2, 1] },
      o($V0, [2, 2]),
      o($V0, [2, 4]),
      o($V0, [2, 5]),
      o($V0, [2, 6]),
      { 11: 19, 41: $V4 },
      { 16: 21, 50: [1, 22] },
      { 14: 23, 21: 24, 45: $V5 },
      { 41: [2, 50] },
      o($V6, [2, 36], { 40: 26, 55: $V7 }),
      o($V6, [2, 37], { 40: 28, 55: $V7 }),
      o($V6, [2, 38], { 40: 29, 55: $V7 }),
      { 45: [2, 52] },
      o($V8, [2, 53]),
      o($V8, [2, 54]),
      o($V8, [2, 55]),
      o($V9, $Va, { 12: 30 }),
      o([41, 42, 43, 48, 52, 53, 54, 56], [2, 42]),
      { 11: 31, 41: $V4 },
      { 41: [2, 51] },
      o($V0, [2, 9]),
      o($Vb, [2, 18], { 22: 32 }),
      o($Vb, [2, 46]),
      o($V6, [2, 39]),
      o($V6, [2, 56]),
      o($V6, [2, 40]),
      o($V6, [2, 41]),
      { 11: 37, 13: 33, 18: 34, 19: 36, 41: $V4, 42: $Vc, 56: $Vd },
      o($V9, $Va, { 12: 39 }),
      o($Ve, [2, 21], { 23: 40, 24: 41, 25: 43, 46: [1, 42] }),
      { 14: 44, 21: 24, 45: $V5 },
      o($V9, [2, 10]),
      o($Vf, [2, 43]),
      o($V9, [2, 12]),
      { 15: 45, 37: 12, 38: 13, 39: 14, 52: $V1, 53: $V2, 54: $V3 },
      o($Vf, [2, 57]),
      { 11: 37, 13: 46, 18: 34, 19: 36, 41: $V4, 42: $Vc, 56: $Vd },
      o($Vg, [2, 16]),
      o($Vb, [2, 17]),
      o($Vg, [2, 47]),
      {
        11: 54,
        14: 53,
        19: 50,
        21: 24,
        26: 47,
        27: 48,
        28: 51,
        29: 52,
        31: 55,
        41: $V4,
        43: $Vh,
        45: $V5,
        47: [1, 49],
        56: $Vd,
      },
      o($V0, [2, 7]),
      { 19: 58, 20: 57, 56: $Vd },
      { 14: 59, 21: 24, 45: $V5 },
      o($Vb, [2, 19]),
      o($Ve, [2, 20]),
      o($Vb, [2, 48]),
      o($Ve, [2, 22]),
      o($Ve, [2, 23]),
      o($Ve, [2, 24]),
      o($Ve, [2, 25]),
      o([41, 42, 43, 56], $Vi, { 30: 60, 33: 61, 34: 62, 35: 64, 48: $Vj }),
      o([41, 43, 44, 56], $Vi, { 33: 61, 34: 62, 35: 64, 30: 65, 48: $Vj }),
      o([41, 43, 44, 48, 56], [2, 44]),
      { 13: 66, 19: 67, 42: $Vc, 56: $Vd },
      o($Vk, [2, 14]),
      o($V0, [2, 8]),
      { 13: 68, 42: $Vc },
      o($Vl, [2, 28]),
      o($Vl, [2, 29]),
      o($Vl, [2, 49]),
      o($Vl, [2, 30], {
        11: 54,
        31: 55,
        36: 69,
        19: 70,
        28: 71,
        29: 72,
        41: $V4,
        43: $Vh,
        56: $Vd,
      }),
      { 32: 73, 44: [1, 74] },
      o($V9, [2, 13]),
      o($Vk, [2, 15]),
      o($Vf, [2, 26]),
      o($Vm, [2, 31]),
      o($Vm, [2, 33]),
      o($Vm, [2, 34]),
      o($Vm, [2, 35]),
      o($Vf, [2, 27]),
      o($Vf, [2, 45]),
    ],
    defaultActions: { 3: [2, 1], 11: [2, 50], 15: [2, 52], 22: [2, 51] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function parse(input) {
      var self = this,
        stack = [0],
        tstack = [],
        vstack = [null],
        lstack = [],
        table = this.table,
        yytext = "",
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc == "undefined") {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      _token_stack: var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== "number") {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
        preErrorSymbol,
        state,
        action,
        a,
        r,
        yyval = {},
        p,
        len,
        newState,
        expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
          var errStr = "";
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push("'" + this.terminals_[p] + "'");
            }
          }
          if (lexer.showPosition) {
            errStr =
              "Parse error on line " +
              lexer.yylineno +
              ":\n" +
              lexer.showPosition() +
              "\nExpecting " +
              expected.join(", ") +
              ", got '" +
              (this.terminals_[symbol] || symbol) +
              "'";
          } else {
            errStr =
              "Parse error on line " +
              lexer.yylineno +
              ": Unexpected " +
              (symbol == EOF
                ? "end of input"
                : "'" + (this.terminals_[symbol] || symbol) + "'");
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected,
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error(
            "Parse Error: multiple actions possible at state: " +
              state +
              ", token: " +
              symbol
          );
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column,
            };
            if (ranges) {
              yyval._$.range = [
                lstack[lstack.length - (len || 1)].range[0],
                lstack[lstack.length - 1].range[1],
              ];
            }
            r = this.performAction.apply(
              yyval,
              [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack,
              ].concat(args)
            );
            if (typeof r !== "undefined") {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    },
  };
  /* generated by jison-lex 0.3.4 */
  var lexer = (function () {
    var lexer = {
      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = "";
        this.conditionStack = ["INITIAL"];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0,
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines
            ? (lines.length === oldLines.length
                ? this.yylloc.first_column
                : 0) +
              oldLines[oldLines.length - lines.length].length -
              lines[0].length
            : this.yylloc.first_column - len,
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError(
            "Lexical error on line " +
              (this.yylineno + 1) +
              ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" +
              this.showPosition(),
            {
              text: "",
              token: null,
              line: this.yylineno,
            }
          );
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(
          0,
          this.matched.length - this.match.length
        );
        return (
          (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
        );
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(
          /\n/g,
          ""
        );
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column,
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done,
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines
            ? lines[lines.length - 1].length -
              lines[lines.length - 1].match(/\r?\n?/)[0].length
            : this.yylloc.last_column + match[0].length,
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, (this.offset += this.yyleng)];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(
          this,
          this.yy,
          this,
          indexed_rule,
          this.conditionStack[this.conditionStack.length - 1]
        );
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = "";
          this.match = "";
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError(
            "Lexical error on line " +
              (this.yylineno + 1) +
              ". Unrecognized text.\n" +
              this.showPosition(),
            {
              text: "",
              token: null,
              line: this.yylineno,
            }
          );
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (
          this.conditionStack.length &&
          this.conditionStack[this.conditionStack.length - 1]
        ) {
          return this.conditions[
            this.conditionStack[this.conditionStack.length - 1]
          ].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function anonymous(
        yy,
        yy_,
        $avoiding_name_collisions,
        YY_START
      ) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0 /* skip whitespace */:
            break;
          case 1 /* skip comments */:
            break;
          case 2:
            return "LPAREN";
            break;
          case 3:
            return "RPAREN";
            break;
          case 4:
            return "LSQUARE";
            break;
          case 5:
            return "RSQUARE";
            break;
          case 6:
            return "LCURLY";
            break;
          case 7:
            return "RCURLY";
            break;
          case 8:
            return "SEMICOLON";
            break;
          case 9:
            return "STRING_LITERAL";
            break;
          case 10:
            return "COMMAND_KW";
            break;
          case 11:
            return "QUERY_KW";
            break;
          case 12:
            return "GLOBAL_KW";
            break;
          case 13:
            return "NUMBER_KW";
            break;
          case 14:
            return "STRING_KW";
            break;
          case 15:
            return "BOOLEAN_KW";
            break;
          case 16:
            return "LIST_KW";
            break;
          case 17:
            return "IDENTIFIER";
            break;
          case 18:
            return 5;
            break;
        }
      },
      rules: [
        /^(?:\s+)/,
        /^(?:\/\/[^\n]*)/,
        /^(?:\()/,
        /^(?:\))/,
        /^(?:\[)/,
        /^(?:\])/,
        /^(?:\{)/,
        /^(?:\})/,
        /^(?:;)/,
        /^(?:"(?:[^"{}]|\{0x[0-9a-fA-F]+\})*")/,
        /^(?:Command\b)/,
        /^(?:Query\b)/,
        /^(?:Global\b)/,
        /^(?:Number\b)/,
        /^(?:String\b)/,
        /^(?:Boolean\b)/,
        /^(?:List\b)/,
        /^(?:[^\s()[\]{};A-Z"]+)/,
        /^(?:$)/,
      ],
      conditions: {
        INITIAL: {
          rules: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          ],
          inclusive: true,
        },
      },
    };
    return lexer;
  })();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;
  parser.Parser = Parser;
  return new Parser();
})();

if (typeof require !== "undefined" && typeof exports !== "undefined") {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  if (typeof module !== "undefined" && require.main === module) {
    exports.main(process.argv.slice(1));
  }
}
