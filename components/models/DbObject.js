module.exports = DbObject;

function DbObject(options) {
  this.SHA1 = options.SHA1;
  this.path = options.path;
};

DbObject.prototype.isBlob = function() {
  return this.type === 'BLOB';
}

DbObject.prototype.isTree = function() {
  return this.type === 'TREE';
}

DbObject.prototype.getPathArray = function() {
  // !Assume path always starts with '/'
  return this.path.split('/').slice(1);
}



