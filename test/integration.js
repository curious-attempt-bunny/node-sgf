var sgf  = require('..');
var fs   = require('fs');
var test = require('tape');

test('parse SGF', function(t) {
  var tree = sgf(fs.readFileSync('sample.sgf').toString())
  t.ok(tree);
  t.equal(JSON.stringify({command: 'GM', arguments: ['1']}), JSON.stringify(tree[0][0]));
  t.equal(JSON.stringify({command: 'BL', arguments: ['596.514']}), JSON.stringify(tree[1][1]));
  t.end();
});
