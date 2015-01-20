var chai = require('chai');
var Tree = require('../../components/models/Tree.js');
var DbObject = require('../../components/models/DbObject.js');
 
chai.config.includeStack = true;
 
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

describe('Tree', function() {
  it('should be an instance of Tree', function() {
    var tree = new Tree({});
    expect(tree instanceof Tree).to.be.true;
  });

  it('should be an instance of DbObject', function() {
    var tree = new Tree({});
    expect(tree instanceof DbObject).to.be.true;
  });

  it('should be able to add children', function() {
    var tree = new Tree({});
    tree.addChild('test');
    expect(tree.children.length).to.equal(1);  
  })
});