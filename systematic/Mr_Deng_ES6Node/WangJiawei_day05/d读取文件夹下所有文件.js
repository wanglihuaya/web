let fs = require('fs');

function readDir(url) {
  fs.readdir(url, (err, files) => {
    console.log(files);
    for (let file of files) {
      //use sync, need variable
      //let stats = fs.statSync(file);

      //use async,need callback
      fs.stat(`${url}/${file}`, (err, stats) => {
        if (stats.isDirectory()) {
          //if is a directory
          readDir(`${url}/${file}`)
        } else if (stats.isFile()) {
          //if is a file
          fs.readFile(`${url}/${file}`, (err, data) => {
            console.log(data.toString());
          })
        }
      });
    }
  })
}
readDir("./创建的目录")