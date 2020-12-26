var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mysql = require("mysql");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//------------------------------------------------------------

//Configure connection parameters
let options = {
  host: "localhost",
  user: "root",
  password: "11111111",
  port: 3306,
  database: "ujiuye",
};
let connection = mysql.createConnection(options);
//------------------------------------------------------------

//Create connection
connection.connect((err) => {
  if (err) {
    console.log("Failed to connect to the database!!" + err.stack);
    return;
  }
  console.log("connection successfully!!!" + connection.threadId);
});
//------------------------------------------------------------

//Execute query
connection.query(
  "select * from 学生 where id=?",
  [3],
  (err, result, fields) => {
    //err Query failed message
    //result Query succeeded message
    //fields 不常用，查询字段名
    // console.log("Result : ");
    // console.log(result);
  }
);
//------------------------------------------------------------

//Disconnect and release resources
connection.end();
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
//------------------------------------------------------------

module.exports = app;
