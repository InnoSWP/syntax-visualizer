const encode = (input) => {
  return encodeURIComponent(input);
}

const decode = (input) => {
  return decodeURIComponent(input);
}

module.exports = { encode, decode };
