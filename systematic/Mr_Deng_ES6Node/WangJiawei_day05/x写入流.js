let fs = require("fs");
const word = "Translation,translation, what is surprise???";

//创建一个可以写入的流，写入到文件output.txt中
let writeStream = fs.createWriteStream("./创建的目录/output.txt");
//使用utf8编码写入数据
writeStream.write(word, "UTF-8");
//标记文件末尾
writeStream.end();
//处理事件流
//open - 事件，当打开文件时触发
writeStream.on("open", () => {
  return console.log("Start writing...");
});

//finish - 所有数据已被写入到底层系统时触发
writeStream.on("finish", () => {
  return console.log("Write complete!!👏🏻");
});

//error - 在接受和写入过程中发生错误时触发
writeStream.on("error", (err) => {
  return console.log(err.stack);
});

console.log("Program execution completed.");