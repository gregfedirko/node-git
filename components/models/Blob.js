var DbObject = require('./DbObject.js');

function Blob(options) {
  DbObject.call(this, options);
  this.type = 'BLOB';
  this.name = options.name;
  this.pathTo = options.pathTo;
}

Blob.prototype = Object.create(DbObject.prototype);
Blob.prototype.constructor = Blob;

module.exports = Blob;
