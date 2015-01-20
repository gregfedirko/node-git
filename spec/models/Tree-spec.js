var chai = require('chai');
var Tree = require('../../components/models/Tree.js');
var Blob = require('../../components/models/Blob.js');
var DbObject = require('../../components/utils.js');
 
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
  });

  it('should be able to return an array of children', function() {
    var tree = new Tree({});
    tree.addChild('test');
    tree.addChild('foo');
    var children = tree.getChildren();
    expect(children).to.deep.equal(['test', 'foo']);
  });

  it ('should have a method, getSortedChildren, that returns formatted children', function() {
    var tree = new Tree({});
    var blob1 = new Blob({
      name: 'foo.js',
      SHA1: 12345
    });

    var blob2 = new Blob({
      name: 'bar.py',
      SHA1: 56789
    });

    console.log('TJFKVGLHBJLKLJV')
    tree.addChild(blob1);
    tree.addChild(blob2);


    var expectedArray = ['12345*foo.js', '56789*bar.py'];

    expect(tree.getSortedChildren()).to.deep.equal(expectedArray);
  });

  it('should have a method, buildStandardizedContents, which builds the trees contents', function() {
    var tree = new Tree({
      path: '/_root/test'
    });
    var blob1 = new Blob({
      name: 'foo.js',
      SHA1: 12345
    });

    var blob2 = new Blob({
      name: 'bar.py',
      SHA1: 12346
    });

    tree.addChild(blob1);
    tree.addChild(blob2);

    var testArray = [
      'TREE',
      '/_root/test',
      ['12345*foo.js', '12346*bar.py']
    ];

    var stringifiedTest = JSON.stringify(testArray);
    expect(tree.buildStandardizedContents()).to.equal(stringifiedTest);

  });

  it('should have a method, setSHA1, which sets the SHA1 based on relevant properties', function() {
    var tree = new Tree({
      path: '/_root/test'
    });
    var blob1 = new Blob({
      name: 'foo.js',
      SHA1: 12345
    });

    var blob2 = new Blob({
      name: 'bar.py',
      SHA1: 12346
    });

    tree.addChild(blob1);
    tree.addChild(blob2);

    var testArray = [
      'TREE',
      '/_root/test',
      ['12345*foo.js', '12346*bar.py']
    ];

    var stringifiedTest = JSON.stringify(testArray);

    tree.setSHA1();

    expect(tree.SHA1).to.equal(utils.getSHA1(stringifiedTest));
  });


});