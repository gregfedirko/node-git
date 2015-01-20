var chai = require('chai');
var DbObject = require('../../components/models/DbObject.js');
 
chai.config.includeStack = true;
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

describe('DbObject', function() {
  it('should have a SHA1 hash property', function() {
    var dbObject = new DbObject({
      SHA1: '0123456789012345678901234567890123456789'
    });
    expect(dbObject.SHA1).to.not.be.undefined;
  });
});