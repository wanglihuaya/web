let jwt = require("./jwt");
function intercept(){
  return (req,res,next)=>{
    // 从请求头中解析出jwt字符串
    let {token} = req.headers;
    if( !token || token==""){
      res.json( {code:208,data:null,msg:"token为空，请检查"} )
      return;
    }
    // 验证token的有效性：获取用户提交的token中的header和paylaod部分，利用签名算法再一次进行签名，和用户提交的token的第三部分签名部分进行对比，如果一致，说明token没有被篡改。
    let [header,payload,signature] = token.split(".");
    // 此时header,payload是base64编码后的字符串。
    let newSigna = jwt.signature( jwt.Base64toJson(header), jwt.Base64toJson(payload),jwt.secret );
    if( newSigna == signature ){
      // res.json( {code:200,data:null,msg:"token有效"});
      // 继续验证token是否过期，获取payload中的exp值，和当前的时间进行比较
      let {exp} = jwt.Base64toJson(payload);
      if( Date.now() > exp ){
        res.json( {code:207,data:null,msg:"token已过期"});
        return;
      }else{
        // token 没有被篡改，也没有过期，则放行
        next();
      }
    }else{
      res.json( {code:208,data:null,msg:"token无效"});
      return;
    }
  }
}
module.exports = intercept;