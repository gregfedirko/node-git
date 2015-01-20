function Index() {
  this.root = {};

};

Index.prototype.getJSON = function() {
  return JSON.stringify(this.root);
}

module.exports = Index;