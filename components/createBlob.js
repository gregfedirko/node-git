// read file from path
// sha1 hash the file
// create a dir if one does not exist named by the two first characters of the hash
// create a file named with the last 38 characters of the hash
// write the file with a base64 encoded contents
// return the sha1 hash


var fs = require('fs');
var crypto = require('crypto');
var zlib = require('zlib');
var mkdirp = require('mkdirp');

function createBlob(filePath) {
  // git command must be executed from the root directory
  var objectStore = process.cwd() + '/.git/objects'
  console.log(objectStore);

  var shasum = crypto.createHash('sha1');
  var fileContent = ""

  var s = fs.ReadStream(filePath);
  s.on('data', function(d) {
    shasum.update(d);
    fileContent += d;
  });

  s.on('end', function() {
    var sha1 = shasum.digest('hex');
    
    var blobDirectory = sha1.slice(0,2);
    var blobName = sha1.slice(2);

    zlib.deflate(fileContent, function(err, buffer) {
      if (err) {throw err};
      var blobContents = (buffer.toString('base64'));
      var blobDirectory = objectStore + '/' + blobDirectory;

      mkdirp(blobDirectory, function(err) {
        if (err) {throw err};

        fs.writeFile(blobDirectory + '/' + blobName, blobContents, function(err) {
          if (err) {throw err};
        });
      }); 

    })
  });
}

module.exports = createBlob;