// console.log('我是慕容海雅');
let a = "Command_S";

function fn() {
  console.log(`I am\n${a}`);
}

class Person {
  constructor() {
    this.name = "张三"
  }
  say() {
    console.log(`我是${this.name}`);
  }
}

//向外暴露 exports 可以理解为是一个 {}
module.exports = {
  a,
  fn,
  Person
}