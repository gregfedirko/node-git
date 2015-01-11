var chai = require('chai');
 
chai.config.includeStack = true;
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;


describe('test', function() {
  it(' should equal 2', function() {
    assert.equal(2,2);
    console.log('foo');
  });
});