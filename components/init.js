var fs = require('fs');
var mkdirp = require('mkdirp');

function init() {
  var currentDirectoryPath = process.cwd();
  var pathElements = currentDirectoryPath.split('/');
  var currentDirectoryName = pathElements[pathElements.length -1];
  console.log(currentDirectoryName);

  fs.readdir('.', function(err, contents) {
    if (err) {throw err};

    if (contents.indexOf('.git') > -1) {
      console.log('git repository already exists');
      return;
    }

    mkdirp('./.git/objects', function(err) {
      if (err) {throw err};

      mkdirp('./.git/refs/heads', function(err) {
        console.log('initialized empty git repository');
      });

      fs.writeFile('./.git/HEAD', 'ref: refs/heads/master', function(err) {
        if (err) { throw err};
      });
    });
    
  });
}

module.exports = init;