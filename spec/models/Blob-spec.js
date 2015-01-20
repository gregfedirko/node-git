var chai = require('chai');
var Blob = require('../../components/models/Blob.js');
var DbObject = require('../../components/models/DbObject.js');
 
chai.config.includeStack = true;
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

describe('Blob', function() {
  it('should be an instance of Blob', function() {
    var blob = new Blob({});
    expect(blob instanceof Blob).to.be.true;
  });

  it('should be an instance of DbObject', function() {
    var blob = new Blob({});
    expect(blob instanceof DbObject).to.be.true;
  });
});