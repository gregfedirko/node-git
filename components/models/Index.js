function Index() {
  this.root = {};

};

Index.prototype.getJSON = function() {
  return JSON.stringify(this.root);
};

Index.prototype.addBlob = function(blob) {
  
  // pathQueue is just a regular JavaScript Array.
  // to dequeue, shift is utilzed.  ex: Array.shift();
  var pathQueue = blob.getPathArray();

  function subRoutine(tree, pathQueue, blob) {
    if (pathQueue.length <= 0) {
      tree.addChild(blob);
      return;
    }

    nextTreeName = pathQueue.shift();
    var nextTree = new Tree({
      name: nextTreeName
    });

    tree.addChild(nextTree);

    subRoutine(nextTree, pathQueue, blob);

  }

};

module.exports = Index;