let crypto = require("crypto");
// jwt 头部
let header = {"typ":"JWT","alg":"HS256"};
// jwt 载荷
let payload ={
  iat: Date.now(), //jwt签发时间
  exp: Date.now() + 1000*60*60*24 //jwt的过期时间，这个过期时间必须要大于签发时间
}
// josn对象转换为base64编码
function json2base64( obj ){
  let str = JSON.stringify( obj );
  let buf = Buffer.from(str);
  return buf.toString("base64");
}
// base64编码 转 json对象
function Base64toJson( str ){
  let buf = Buffer.from(str,"base64");
  let jsonstr = buf.toString();
  return JSON.parse( jsonstr );
}

// console.log( json2base64(header) );

// jwt的第三部分（签名signature）由 base64转码后的header 、base64转码后的payload 和 secret ，再使用加密算法加密得到
let secret = "offcn.com";
// 生成签名
function signature(header,payload,secret){
  let str = json2base64(header)+"."+json2base64(payload);
  let hash = crypto.createHmac("sha256", secret);
  hash.update( str );
  return hash.digest("base64");
}
// jwt字符串由 base64转码的header、base64转码的paylaod、签名部分由圆点连接组成
function generatorJWT(h,p,secret){
  return `${json2base64(h)}.${json2base64(p)}.${signature(h,p,secret)}`
}
module.exports = {
  header,
  payload,
  secret,
  json2base64,
  Base64toJson,
  signature,
  generatorJWT
}
