let fs = require('fs');

let readStream = fs.createReadStream('./创建的目录/敢杀我的马.mp3');
let writeStream = fs.createWriteStream('./创建的目录/aaa.mp3');

//实现边读边写过程
readStream.on('data', (chunk) => {
  writeStream.write(chunk);
})
//结束
readStream.on('end', () => {
  writeStream.end();
})
writeStream.on('finish', () => {
  console.log('cody successfully！');
})

// readStream.pipe(writeStream);