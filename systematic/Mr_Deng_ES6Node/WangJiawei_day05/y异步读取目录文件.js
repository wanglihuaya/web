let fs = require('fs');

fs.readdir('./创建的目录', async (err, files) => {
  //if error,log err
  if (err) {
    return console.log(err);
    ;
  } else {
    console.log(files);
    let poem = "like a poem:";
    //Loop through each files
    for (const file of files) {
      //Sync view file information
      let stat = fs.statSync("./创建的目录/" + file);
      if (stat.isFile()) {
        // No error and is file
        poem += await readF("./创建的目录/" + file);
      }
    }
    console.log(poem);
    
    // }
  }
  // })
  // }
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