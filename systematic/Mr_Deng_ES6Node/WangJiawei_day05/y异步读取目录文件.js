let fs = require('fs');

fs.readdir('./创建的目录', async (err, files) => {
  console.log(files);
  if (files.isDirectory()) {

    console.log(files);
    let poem = "like a poem:";
    console.log(poem);
    for (const file of files) {
      poem += await readF("./创建的目录" + file);
    }
  }
});

function readF(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
}