module.exports = DbObject;

function DbObject(options) {
  this.SHA1 = options.SHA1;
};

DbObject.prototype.isBlob = function() {
  return this.type === 'BLOB';
}

DbObject.prototype.isTree = function() {
  return this.type === 'TREE';
}

