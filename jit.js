#!/usr/bin/env node

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var mkdirp = require('mkdirp');

var commandArray = argv._;

var commandMap = {
  init: init
}

if (commandArray.length > 0) {
  commandMap[commandArray[0]]();
}

/*

creates .git directory in the current directory

/.git
  /
  /objects

*/
function init() {
  var currentDirectoryPath = process.cwd();
  var pathElements = currentDirectoryPath.split('/');
  var currentDirectoryName = pathElements[pathElements.length -1];
  console.log(currentDirectoryName);

  fs.readdir('.', function(err, contents) {
    if (err) {throw err};

    if (contents.indexOf('.git') > -1) {
      console.log('git repository already exists');
      return;
    }

    mkdirp('./.git/objects', function(err) {
      if (err) {throw err};

      mkdirp('./.git/refs/heads', function(err) {
        console.log('initialized empty git repository');
      });

      fs.writeFile('./.git/HEAD', 'ref: refs/heads/master', function(err) {
        if (err) { throw err};
      });
    });
    
  });
}






