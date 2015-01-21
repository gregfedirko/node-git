var DbObject = require('./DbObject.js');
var utils = require('../utils.js');

function Tree(options) {
  DbObject.call(this, options);
  this.type = 'TREE';
  this.name = options.name || '_root';
  this.children = [];
}
Tree.prototype = Object.create(DbObject.prototype);
Tree.prototype.constructor = Tree;

// assume item is a DbObject
Tree.prototype.addChild = function(item) {
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    if (child.name === item.name) {
      this.children[i] = item;
      return;
    }
  } 
  this.children.push(item);
};

Tree.prototype.getChildren = function() {
  return this.children;
};

Tree.prototype.getSortedChildren = function() {
  var formattedChildren = [];
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    var childStr = "";
    childStr = childStr + child.SHA1 + '*' + child.name;
    formattedChildren.push(childStr);
  }
  return formattedChildren.sort();
};

Tree.prototype.buildStandardizedContents = function() {
  var type = this.type;
  var path = this.path;
  var children = this.getSortedChildren();

  var contents = [
    type,
    path,
    children
  ];

  return JSON.stringify(contents);
};

Tree.prototype.setSHA1 = function() {
  var standardizedContents = this.buildStandardizedContents();
  this.SHA1 = utils.getSHA1(standardizedContents);
};

Tree.prototype.clearSHA1 = function() {
  this.SHA1 = null;
};

Tree.prototype.generateTreeHashes = function() {
  // loop through children 
  // recursively visit each one
  // after that is complete, generate a hash for the current node, and exit

  subRoutine(this);

  function subRoutine(tree) {
    for (var i = 0; i < tree.children.length; i++) {
      var child = tree.children[i];
      if (child.isTree()) {
        subRoutine(child);
      }
    }
    tree.setSHA1();
  }
};

module.exports = Tree;
