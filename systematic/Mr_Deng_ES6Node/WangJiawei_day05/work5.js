let fs = require("fs");
console.log("Delete a non-empty directory using recursion!");

//Package
function fn(url) {
  //读文件夹
  fs.readdir(url, async (err, files) => {
    //如果有错 抛出
    if (err) throw err;
    //traverse_every_folder
    for (const file of files) {
      //synchronously_query_file_information
      let stat = fs.statSync(`${url}/${file}`);
      //if is a directory
      if (stat.isDirectory()) {
        //callback
        let fff = await readD(`${url}/${file}`);
        if (!fff.length) {
          fs.rmdir(`${url}/${file}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          fn(`${url}/${file}`);
        }
      }
    }
  });
}

function readD(url) {
  return new Promise((resolve, reject) => {
    fs.readdir(url, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}
