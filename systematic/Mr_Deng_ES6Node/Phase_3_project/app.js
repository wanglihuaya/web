let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let categoryRouter = require("./routes/category");
let goodsRouter = require("./routes/goods");
let memberRouter = require("./routes/member");
let intercept = require("./tools/intercept");
let cartRouter = require("./routes/cart");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // 允许请求头增加 token 字段
  res.header("Access-Control-Allow-Headers", "token");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", categoryRouter);
app.use("/goods", goodsRouter);
app.use("/member", memberRouter);
//登录拦截，之后的路由都需要jwt字符串验证有效后才可以访问，之上的不需要，之后的需要
app.use(intercept());
app.use("/cart", cartRouter);

module.exports = app;
