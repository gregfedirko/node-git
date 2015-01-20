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
  });
});
