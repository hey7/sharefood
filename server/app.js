var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入session
var session = require('express-session');
//跨域
var cors = require('cors');

var app = express();

//跨域
app.use(cors({
  //origin: config.fe_http, //允许这个域的访问
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST'], //只允许GET和Post请求
  alloweHeaders: ['Conten-Type', 'Authorization'] //只允许带着两种头的连接访问
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//自定义模块
var loginRegister = require('./routes/loginRegister');

//暴露API接口
app.use('/loginRegister', loginRegister);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;