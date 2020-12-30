let express = require("express");
let router = express.Router();
let db = require("../tools/db");
let to = require("../tools/to");
let uuid = require("uuid");
let crypto = require("crypto");
let jwt = require("../tools/jwt");

router.put("/user", async (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;
  console.log(username, password);
  let uid = uuid.v1();
  //Encrypt the password
  let hash = crypto.createHash("md5");
  hash.update(password);
  let pwd = hash.digest("hex");
  let sql =
    "INSERT INTO member(uid,username,password,createdate) values(?,?,?,?)";
  let [err, result] = await to(db.query(sql, [uid, username, pwd, Date.now()]));
  if (!err) {
    res.json({ code: 200, data: null, message: "registration successfully!" });
    return;
  } else {
    res.json({ code: 207, data: err, message: "registration failed!" });
    return;
  }
});

/* Member Login */
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  // Clear text password encryption
  let hash = crypto.createHash("md5");
  hash.update(password);
  let pwd = hash.digest("hex");
  let sql = "select * from member where username=? and password=?";
  let [err, result] = await to(db.query(sql, [username, pwd]));
  if (!err) {
    if (result.length > 0) {
      //Get uid from the query result
      //在jwt的payload中添加uid，设置失败的时间
      //生成jwt字符串，附加到json中发送给客户端
      let [{ uid }] = result;
      jwt.payload["uid"] = uid;
      jwt.payload["exp"] = Date.now() + 1000 * 60 * 60 * 24;
      let token = jwt.generatorJWT(jwt.header, jwt.payload, jwt.secret);
      res.json({
        code: 200,
        data: { username, token },
        message: "User login successfully!",
      });
      return;
    } else {
      res.json({
        code: 201,
        data: null,
        message: "Incorrect account or password!",
      });
      return;
    }
  } else {
    res.json({ code: 207, data: err, message: "registration failed!" });
    return;
  }
});

module.exports = router;
