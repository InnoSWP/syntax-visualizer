const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = require('lz-string');

const encode = (input) => {
  return compressToEncodedURIComponent(input);
}

const decode = (input) => {
  return decompressFromEncodedURIComponent(input);
}

module.exports = { encode, decode };
