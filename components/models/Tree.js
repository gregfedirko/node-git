var DbObject = require('./DbObject.js');

function Tree(options) {
  DbObject.call(this, options);
  this.type = 'TREE';
  this.name = options.name;
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

module.exports = Tree;
