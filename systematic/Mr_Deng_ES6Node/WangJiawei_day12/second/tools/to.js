//await-to.js

function to(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => {
      return [err];
    });
}

module.exports = to;
