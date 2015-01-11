#!/usr/bin/env node

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var commandArray = argv._;

var commandMap = {
  init: init
}

if (commandArray.length > 0) {
  commandMap[commandArray[0]]();
}

function init() {
  var currentDirectoryPath = process.cwd();
  var pathElements = currentDirectoryPath.split('/');
  var currentDirectoryName = pathElements[pathElements.length -1];
  console.log(currentDirectoryName);
}