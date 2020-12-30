let crypto = require("crypto");
//JWT 头部
let header = { type: "JWT", alg: "HS256" };
//JWT载荷
let payload = {
  iat: Date.now(), //jwt timestamp
  exp: Date.now() + 1000 * 60 * 60 * 24, //jwt的过期时间，这个过期时间必须要
};
//json 对象转换为base64编码
function json2base64(obj) {
  let str = JSON.stringify(obj);
  let buf = Buffer.from(str);
  return buf.toString("base64");
}

console.log(json2base64(header));

//jwt 的第三部分 （签名signature）由base64转码后的header、base64转码后的payload和secret，再使用加密算法加密得到

let secret = "commands";

//生成签名
function signature(header, payload, secret) {
  let str = json2base64(header) + "." + json2base64(payload);
  let hash = crypto.createHmac("sha256", secret);
  hash.update(str);
  return hash.digest("base64");
}

function generatorJWT(h, p, secret) {
  return `${json2base64(h)}.${json2base64(p)}.${signatureBase64(h, p, secret)}`;
}

console.log(generatorJWT(header, payload, secret));

module.exports = {
  header,
  payload,
  secret,
  json2base64,
  signature,
  generatorJWT,
};
