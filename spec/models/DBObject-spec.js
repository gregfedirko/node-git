var chai = require('chai');
var DbObject = require('../../components/models/DbObject.js');
var Tree = require('../../components/models/Tree.js');
var Blob = require('../../components/models/Blob.js');
 
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

  it('should have a method, isTree, that returns true for a tree object', function() {
    var tree = new Tree({});
    expect(tree.isTree()).to.be.true;
  });

  it('should have a method, isTree, that returns false for a non-tree object', function() {
    var blob = new Blob({});
    expect(blob.isTree()).to.be.false;
  });

  it('should have a method, isBlob, that returns true for a blob object', function() {
    var blob = new Blob({});
    expect(blob.isBlob()).to.be.true;
  });

  it('should have a method, isBlob, that returns false for a non-blob object', function() {
    var tree = new Tree({});
    expect(tree.isBlob()).to.be.false;
  });

  it('should have a method, getPathArray, that returns an Array representing the path', function() {
    var dbObject = new DbObject({
      path: '/foo/bar/baz'
    });

    var path = dbObject.getPathArray();

    expect(path).to.deep.equal(['foo', 'bar', 'baz']);
  })

});