const path = require("path");
const querystring = require("querystring");
path.basename("C:\\temp\\myfile.html");
console.log(path.resolve("C:"));
console.log(path.dirname("/目录1/目录2/目录3"));
console.log(path.extname("index.coffee.md"));
console.log(
  path.format({
    root: "/ignored",
    dir: "/home/user/dir",
    base: "file.txt",
  })
);
console.log(path.parse("/home/ersu/ir/file.txt"));

console.log(querystring.parse("foo=bar&abc=xyz&abc=123"));