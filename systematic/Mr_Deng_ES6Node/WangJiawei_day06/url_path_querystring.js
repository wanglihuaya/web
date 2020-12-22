let url = require("url");
let path = require("path");
// let query = require("query");

//解析url
//url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

let urlString =
  "http://127.0.0.1:3000/haha/ok.html?id=120&name=jack&sex=男#abc";
console.warn("\n", urlString, "\n");

let urlObj = url.parse(urlString);
let urlObj1 = url.parse(urlString, true, true);
console.log(urlObj);
console.log(urlObj1);

// let { id, sex, name } = urlObj1.query;
// console.log(id, name, sex);

//获取资源文件的扩展名
let { pathname } = urlObj;
let extName = path.extname(pathname);
console.log(extName);
//获取目录名
/* path.dirname('/foo/bar/baz/asdf/quux');
   Returns: '/foo/bar/baz/asdf'
*/
let dirname = path.dirname(pathname);
console.log(dirname);

//拼接路径

/* path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
Returns: '/foo/bar/baz/asdf' */

console.log(path.join("ok", "aa", "bb", ".."));

console.log(path.resolve(__dirname, "..", "sd"));
///Users/lihua/Documents/GitHub/web/systematic/Mr_Deng_ES6Node/sd
console.log(path.resolve(__dirname, "sd"));
///Users/lihua/Documents/GitHub/web/systematic/Mr_Deng_ES6Node/sd

//将查询字符换转换为对象
// let {
//   query
// } = url.parse(urlString);
// console.log(query);
