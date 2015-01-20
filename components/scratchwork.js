// {
//   type: 'blob',
//   name: 'foo.py',
//   hash: '2323242342342'
// }

// {
//   type 'tree',
//   name: 'foo',
//   hash: 'sfskjfsjf',
//   children: [
//     {hash},
//     {hash}...
//   ]
// }

// {
//   type: commit,
//   hash: 'sfasfasdf',
//   parent: commit Object,
//   rootTree: '23902390248092348'
// }


var DBObject = function(options) {
  this.type = options.type,
  this.name = options.name
};

var Blob = function(options) {
  DBObject.call(this, options);
  this.hash = options.hash;
};
Blob.prototype = Object.create(DBObject.prototype);
Blob.prototype.constructor = Blob


var Tree = function(options) {
  DBObject.call(this, options);
  this.children = [];

};
Tree.prototype = Object.create(DBObject.prototype);
Tree.prototype.constructor = Tree;




// Add:
// generate blob : returns a Blob Class representing the recently added Blob
// To write to the index file:
  // parse index.json into an Index class
  // add the object to the index class
  // write the index class to file


//Commit 
// parse the index.json into an Index Class
// Create Tree Hashes for each Item 
// Write a commit object to the database and clean up references

// Checkout 
// generate an index file from a commit object
// parse the index file into an Index Class
// clear the working directory and write files from the Index Class







