var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var commandArray = argv._;

var commandMap = {
  init: init
}

if (commandArray) {
  commandMap[commandArray[0]]();
}

function init() {
  var pathElements = process.cwd().split('/');
  var currentDirectory = pathElements[pathElements.length -1];
  console.log(currentDirectory);
}