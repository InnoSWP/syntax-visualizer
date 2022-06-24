const encode = (input) => {
  return atob(input);
}

const decode = (input) => {
  return btoa(input);
}

module.exports = { encode, decode };
