const { compressToBase64, decompressFromBase64 } = require('lz-string');

export const encode = (input) => {
  return compressToBase64(input);
}

export const decode = (input) => {
  return decompressFromBase64(input);
}

module.exports = { encode, decode };
