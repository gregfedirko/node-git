var chai = require('chai');
var Index = require('../../components/models/Index.js');
 
chai.config.includeStack = true;

// tests for the 
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;


describe('Index', function() {

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
    it('should build the index tree path needed to insert the blob', function() {
      var index = new Index();

      var blob = new Blob({
        pathTo: '/foo/bar',
        name: 'blob.js',
        SHA1: '0123456789012345678901234567890123456789'
      });

      index.addBlob(blob);

      var path = '';
      recursiveCheck(index);
      expect(path).to.equal('/foo/bar/blob.js');

      ////////
      function recursiveCheck(tree) {
        path += '/' + tree.name;
        var children = tree.getChildren();
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.isTree()) {
            recursiveCheck(tree)
          } else if (child.isBlob()){
            path += '/' + child.name;
          }
        }
      }
    });
});
