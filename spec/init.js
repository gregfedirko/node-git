var chai = require('chai');
 
chai.config.includeStack = true;
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var Assertion = chai.Assertion;
var assert = chai.assert;

describe('test', function() {
  it(' should equal 2', function() {
    assert.equal(2,2);
    console.log('foo');
  });
});