//ES6 module import
let a = 10;
function fn() {
  console.log("Hello world!");
}

//The first
// export { a, fn };

//The second
export default {
  a,
  fn,
};
