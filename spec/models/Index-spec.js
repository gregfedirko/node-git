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

});