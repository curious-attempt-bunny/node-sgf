var Parser = require("jison").Parser;

var grammar = {
  "lex": {
    "rules": [
      ["\\s+",       "/* skip whitespace */"],
      ["[A-Z]{1,2}", "return 'COMMAND';"],
      ["\\[(?:\\\\.|[^\\\\\\]])*\\]", "return 'ARGUMENT';"],
      [";",          "return 'BLOCK_MARKER';"],
      ["\\(",        "return 'NODE_START';"],
      ["\\)",        "return 'NODE_END';"],
      ["$",          "return 'EOF';"]
    ]
  },  
  "bnf": {
    "game" :[[ "node EOF", "return $1;"  ]],
    "node" :[[ "NODE_START blocks NODE_END",  "$$ = $2;" ]],
    "blocks" :[[ "block blocks", "$2.unshift($1); $$ = $2;" ], [ "block", "$$ = [$1];" ]],
    "block" :[[ "BLOCK_MARKER commands", "$$ = $2;"]],
    "commands" : [[ "command commands", "$2.unshift($1); $$ = $2" ], ["command", "$$ = [$1];"]],
    "command" : [[ "COMMAND arguments", "$$ = {command: $1, arguments: $2};" ]],
    "arguments": [[ "ARGUMENT arguments", "$2.unshift($1.substring(1, $1.length-1)); $$ = $2" ], ["ARGUMENT", "$$ = [$1.substring(1, $1.length-1)];"]]
  }
};

var parser = new Parser(grammar);

module.exports = function(data) {
  return parser.parse(data);
};
