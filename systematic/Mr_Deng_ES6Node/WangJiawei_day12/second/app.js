var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mysql = require("mysql");
let crypto = require("crypto"); //hash

let db = require("./tools/db");
let to = require("./tools/to");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//------------------------------------------------------------

//------------------------------------------------------------

app.get("/login", (req, res) => {
  res.render("log_in.ejs");
});
//响应前端的登录请求
app.post("/login", async (req, res) => {
  let { account, pwd } = req.body;
  console.log(account, pwd);
  //去数据库查询account和pwd是否一致
  //先将用户的明文密码再次加密，然后再和数据库中的密码进行对比
  let hash = crypto.createHash("md5");
  hash.update(pwd);
  let password = hash.digest("hex");
  let sql = "SELECT * FROM ADMIN WHERE account=? and password=?";
  //如果程序执行错误，则错误消息赋值给err，result值为undefined
  //如果程序执行成功，则err为null，result值为正确结果
  let [err, result] = await db.query(sql, [account, password]);
  //如果账户或密码不正确，result为[]
  //如果✅，result为[{}]

  console.log("result", result);

  if (!err) {
    if (result.length > 0) {
      //账号密码✅，写一个cookie作为已登录的凭证
      res.cookie("uname", account, { maxAge: 1000 * 60 * 60 });

      res.json({ code: 200, data: null, msg: "User login successfully." });
      return;
    } else {
      res.json({ code: 20001, data: null, msg: "Incorrect account password." });
      return;
    }
  } else {
    res.json({ code: 500, data: err, msg: "Server Error." });
    return;
  }
});
//------------------------------------------------------------

//判断用户是否登录，如果没有登录凭证，跳转到/login让用户登录
app.use((req, res, next) => {
  let uname = req.cookies.uname || "";
  // console.log("uname:", uname);
  if (!uname) {
    res.redirect("/login");
  } else {
    next();
  }
});
//------------------------------------------------------------

app.use("/", indexRouter);
app.use("/users", usersRouter);
//------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
