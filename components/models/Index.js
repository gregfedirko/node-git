var Tree = require('./Tree.js');

function Index() {
  this.root = new Tree({});
};

Index.prototype.getJSON = function() {
  return JSON.stringify(this.root);
};

Index.prototype.addBlob = function(blob) {
  
  // pathQueue is just a regular JavaScript Array, used as a Queue.
  // to dequeue, shift is utilzed.  ex: Array.shift();
  var pathQueue = blob.getPathArray();

  subRoutine(this.root, pathQueue, blob);

  function subRoutine(tree, pathQueue, blob) {
    tree.clearSHA1();
    if (pathQueue.length <= 0) {
      tree.addChild(blob);
      return;
    }

    nextTreeName = pathQueue.shift();

    var nextTree;
    var i = 0;
    while (nextTree === undefined && i < tree.children.length) {
      var child = tree.children[i];
      if (child.name === nextTreeName) {
        nextTree = child;
      }
      i++;
    }
    
    if (nextTree === undefined) {
      nextTree = new Tree({
        name: nextTreeName
      });
      tree.addChild(nextTree);
    }


    subRoutine(nextTree, pathQueue, blob);

  }

};

Index.prototype.generateTreeHashes = function() {
  this.root.generateTreeHashes();
};

module.exports = Index;