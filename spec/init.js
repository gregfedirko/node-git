var chai = require('chai');
 
chai.config.includeStack = true;
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var Assertion = chai.Assertion;
var assert = chai.assert;

var mock = require('mock-fs');

mock.restore();