var fs = require('fs');
// console.log('创建 创建的目录');
// fs.mkdir("创建的目录", (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('创建目录成功');
//   }
// });

// console.log('查看 创建的目录');
// fs.readdir('创建的目录', (err, files) => {
//   if (err) {
//     console.error(err);
//   } else {
//     files.forEach(file => {
//       console.log(file);
//     });
//   }
// })

console.log('准备删除目录 ./创建目录/www/eee');

fs.rmdir('./创建的目录/www/eee', (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('删除成功');
  }
})
