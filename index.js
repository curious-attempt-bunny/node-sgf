var fs = require('fs');

var data = fs.readFileSync('sample.sgf').toString();
data = 
"(;GM[1]FF[4]CA[UTF-8]AP[CGoban:3]ST[2]\n"+
"RU[Chinese]SZ[19]HA[6]KM[0.50]TM[600]OT[5x30 byo-yomi]\n"+
"PW[AyaBot5]PB[malbery]WR[1k]BR[7k]DT[2013-06-07]PC[The KGS Go Server at http://www.gokgs.com/]C[AyaBot5 [1k\\]: GTP Engine for AyaBot5 (white): Aya version 7.61 : If life-death is wrong, push 'undo' and remove dead stones. Private chat 'wr' gets winrate.\n"+
"]RE[W+11.50]\n"+
";B[pd]BL[596.514]\n)"
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
    "command" : [[ "COMMAND ARGUMENT", "$$ = {command: $1, argument: $2};" ]]
  }
};

/\[(?:(?:\\[^\]])|(?:\])|(?:[^\\\]]))*?\]/

console.dir(new RegExp(grammar.lex.rules[2][0]));

var parser = new Parser(grammar);

//data = "(;AA[1\\]2])";
var tree = parser.parse(data);

console.dir(JSON.stringify(tree));
