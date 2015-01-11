var crypto = require('crypto');


module.exports = {
  getSHA1: getSHA1
}

function getSHA1(data) {
  var shasum = crypto.createHash('sha1');
  shasum.update(data);
  return shasum.digest('hex');
}