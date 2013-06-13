# Description [![build status](https://secure.travis-ci.org/curious-attempt-bunny/node-sgf.png)](http://next.travis-ci.org/curious-attempt-bunny/node-sgf)

SGF parsing for Go games

# Usage

    var fs  = require('fs');
    var sgf = require('node-sgf');
    sgf(fs.readFileSync('game.sgf').toString());

# Installation

    npm install node-sgf

# License

MIT
