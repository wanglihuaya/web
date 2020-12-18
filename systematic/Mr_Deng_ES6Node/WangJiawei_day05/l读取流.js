let fs = require('fs');
//创建读取流
let readStream = fs.createReadStream('/Users/lihua/Desktop/001-让子弹飞敢杀我的马.mp3');
let arr = [];
//open事件，当打开文件时触发
readStream.on("open", () => {
  console.log("action...");
})

//data事件，当有数据可读时触发
readStream.on("data", (chunk) => {
  console.log(chunk.length);
  console.log("loading...");
  arr.push(chunk);
})

//end 没有更多的数据可读时触发
readStream.on("end", () => {
  console.log("read over");
  let buffer = Buffer.concat(arr); //拼合成完整的大文件
  fs.writeFile("./创建的目录/aa.mp3", buffer, (err) => {
    console.log("copy over");
  })
})