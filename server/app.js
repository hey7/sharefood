var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//跨域
var cors = require('cors');

var app = express();

//跨域
app.use(cors({
  origin: ['http://localhost:8080','http://127.0.0.1:8080'],
  credentials: true,  //允许跨域携带cookie
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
var user = require('./routes/user');
var menu = require('./routes/menu');
var dictionary = require('./routes/dictionary');
var comment = require('./routes/comment')
var collection = require('./routes/collection')
var love = require('./routes/love')
var reports = require('./routes/reports')

//暴露API接口
app.use('/user', user);
app.use('/menu',menu);
app.use('/dictionary',dictionary);
app.use('/comment',comment);
app.use('/collection',collection);
app.use('/love',love);
app.use('/reports',reports);


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