var createError = require('http-errors');    //错误处理模块，显示错误（非必须）
var express = require('express');            //express 模块
var path = require('path');                  //path 模块
var cookieParser = require('cookie-parser'); //cookie管理模块
var logger = require('morgan');              //日志管理模块

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //将views目录设置为 模板文件存储目录
app.set('view engine', 'ejs');//将EJS设置为默认的模板引擎
//---------------------------------------------------------------------

app.use(logger('dev')); //日志模块的配置，非必须
//---------------------------------------------------------------------

//Express 的内置中间件，作用是可以直接使用response.json()向浏览器发送json
app.use(express.json());
//---------------------------------------------------------------------

/*
** Express.urlencoded() url内置的中间件，用来代替formidable，实现简单表单数据的解析，不能实现文件上传
** 如果表单提交为GET，那么可以使用request.query;如果表单的提交为POST,使用request.body
*/
app.use(express.urlencoded({ extended: false }));
//---------------------------------------------------------------------

//set cookie
app.use(cookieParser());
//---------------------------------------------------------------------

//静态文件导入
app.use(express.static(path.join(__dirname, 'public')));
//---------------------------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler错误消息处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
