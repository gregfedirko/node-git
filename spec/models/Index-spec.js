var chai = require('chai');
var Index = require('../../components/models/Index.js');
var Tree = require('../../components/models/Tree.js');
var Blob = require('../../components/models/Blob.js');
 
chai.config.includeStack = true;

// tests for the 
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;


describe('Index', function() {

  it('should initialize with a property root, which is an instance of Tree', function() {
    var index = new Index();
    expect(index.root instanceof Tree).to.be.true;
  });

  describe('method: getJSON', function() {

    it('should exist', function() {
      var index = new Index();
      expect(index.getJSON).not.to.be.undefined;
    });

    it('should return a valid JSON string', function() {
      var index = new Index();
      var testObject = {
        foo: 'bar',
        superheroes: {
          names: ['batman', 'superman', 'robin']
        }
      };
      index.root = testObject;
      var testJSON = JSON.stringify(testObject);
      var indexGeneratedJSON = index.getJSON();
      assert.equal(testJSON, indexGeneratedJSON);
    });
  });

  describe('method: addBlob', function() {
    it('should exist', function() {
      var index = new Index();
      expect(index.addBlob).not.to.equal.undefined
    });

    it('should build the index tree path needed to insert the blob', function() {
      var index = new Index();

      var blob = new Blob({
        path: '/foo/bar',
        name: 'blob.js',
        SHA1: '0123456789012345678901234567890123456789'
      });

      index.addBlob(blob);

      var path = '';
      recursiveCheck(index.root);
      expect(path).to.equal('/_root/foo/bar/blob.js');

      ////////
      function recursiveCheck(tree) {
        path += ('/' + tree.name);
        var children = tree.getChildren();
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.isTree()) {
            recursiveCheck(child);
          } else if (child.isBlob()){
            path += '/' + child.name;
          }
        }
      }
    });

    it('should clear all hashes of existing trees on the way to blob insert operation', function() {
      var index = new Index();

      var blob = new Blob({
        path: '/foo/bar',
        name: 'blob.js',
        SHA1: '0123456789012345678901234567890123456789'
      });

      // add a blob
      index.addBlob(blob);
      //generate tree hashes for the entire tree
      index.generateTreeHashes();

      var blob2 = new Blob({
        path: '/foo/bar',
        name: 'blob.js',
        SHA1: '0123456789012345678902945567890123456789'
      });
      // insert another blob, which should clear all trees to this path, 
      // since they are no longer valid for the new tree strucure
      index.addBlob(blob2);

      var SHA1List = [];
      recursiveCheck(index.root);
      expect(path).to.equal('/_root/foo/bar/blob.js');

      ////////
      function recursiveCheck(tree) {
        SHA1List.push(tree.SHA1);
        var children = tree.getChildren();
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.isTree()) {
            recursiveCheck(child);
          } else if (child.isBlob()){
            path += '/' + child.name;
          }
        }
      }
    });

    it('should overwrite the hash of an existing blob', function() {
      var index = new Index();

      var blob = new Blob({
        path: '/foo/bar',
        name: 'blob.js',
        SHA1: '0123456789012345678901234567890123456789'
      });

      index.addBlob(blob);

      var blob = new Blob({
        path: '/foo/bar',
        name: 'blob.js',
        SHA1: 'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE'
      });

      index.addBlob(blob);


      var newSHA1 = recursiveCheck(index.root);
      expect(newSHA1).to.equal('ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE');

      ////////
      function recursiveCheck(tree) {
        var children = tree.getChildren();
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.isTree()) {
            return recursiveCheck(child);
          } else if (child.isBlob()){
            return child.SHA1;
          }
        }
      }
    });
  });
});
