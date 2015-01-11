#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var commandArray = argv._;


var init = require('./components/init.js');
var createBlob = require('./components/createBlob.js');


var commandMap = {
  init: init,
  createBlob: function() {
    var filePath = process.cwd() + '/' + argv['p'];
    createBlob(filePath);
  }
}

if (commandArray.length > 0) {
  commandMap[commandArray[0]]();
}







