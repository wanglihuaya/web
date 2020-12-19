let fs = require("fs");
//写文件 writeFile();
//node中的命令提供了两个版本：writeFile 异步版本. writeFileSync 同步办法
//注意，异步I/O，意味着node会继续向下执行其他代码
fs.appendFile('./hello.text', '越关一爱考我德洞故，服特促视由而日以只太九放韩地使快，梵安连大杀远清，车不官二妄二子自国老办，投畴归向，让让天圣四不那年老兼者他，才区事若到感娇样鲜十也其大你着开夫在，就今关君玉感担己才谷即办今苦，锐何杀磊，以锐秦我放仑孔饮谭，竟向命感得第应皮于薪法君病将，评又惜而磊地其新洪，愚司病见玉他李老治身朋了到文己，灰学亡幕郭希衣心成事可什气投是，够必连后服罪珍', (err) => {
  if (!err) {
    console.log('第二次追加👌');
  }
})

fs.writeFile("./hello.text", "今天天气不错", () => {
  console.log('写入文件完成');
})

let sum = 0;
for (let i = 0; i < 10000; i++) {
  sum += i;
}
console.log(sum);

fs.appendFile('./hello.text', '天气变差了', (err, data) => {
  if (!err) {
    console.log("第一次追加👌");
  }
})

fs.readFile("./hello.text", (err, data) => {
  if (!err) {
    console.log(data.toString("utf-8"));
  }
});

// fs.unlink('./hello.text', (err) => {
//   if (!err) {
//     console.log('删除成功');
//   }
// }) 