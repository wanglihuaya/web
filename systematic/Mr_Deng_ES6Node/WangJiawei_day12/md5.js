let crypto = require("crypto");

let hash = crypto.createHash("md5");
// let hash = crypto.createHmac("md5", "lihua");

hash.update("123456");
console.log(hash.update("123456"));
let pwd = hash.digest("hex");
console.log(pwd);
