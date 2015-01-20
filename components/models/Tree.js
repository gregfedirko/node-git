var DbObject = require('./DbObject.js');

function Tree(options) {
  DbObject.call(this, options);
  this.type = 'TREE';
  this.name = options.name || '_root';
  this.children = [];
}
Tree.prototype = Object.create(DbObject.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.addChild = function(item) {
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
}

module.exports = Tree;
