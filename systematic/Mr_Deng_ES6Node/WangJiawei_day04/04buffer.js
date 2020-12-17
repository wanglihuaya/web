/* // 初始化一个长度为10字节的buffer缓存区，默认里面没有数据
let buf = Buffer.alloc(10);
buf.write("helloworldabcd")
console.log(buf.toString());
console.log(buf);

// buffer与字符串的转换
let buf2 = Buffer.from("adfsfsdfdf您好", "utf8")
// toString()可实现不同编码的转换
// 默认是utf8；还有base64、hex等
console.log(buf2.toString("hex"));
console.log(buf2);
console.log(buf2.toString());

// buffer和对象的互相转换
let obj = {
  name: "jack",
  age: 18
};
let buf3 = Buffer.from(JSON.stringify(obj));
console.log(JSON.stringify(obj));
console.log(JSON.parse(buf3.toString()));
console.log(buf3.toString());
console.log(buf3); */

// buffer的合并
let buf1 = Buffer.from("hello");
let buf2 = Buffer.from("你好");

let buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString("utf8"));

const buf = Buffer.from('Hey!')
let bufcopy = Buffer.alloc(4) //分配 4 个字节。
buf.copy(bufcopy)
console.log(bufcopy.toString());
