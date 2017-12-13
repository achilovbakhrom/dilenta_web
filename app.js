var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var shop = require('./routes/shop');
var product = require('./routes/product');
// require('./model/User');
var app = express();
var db = require("./db");
// var mongoose = require('mongoose')

// Bootstrap db connection
// mongoose.createConnection('mongodb://localhost:27017/dilenta')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/shop', shop);
app.use('/product', product);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("log: " + err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.connect("mongodb://localhost:27017/dilenta", function (err){
  if(err){
        console.log(err);
        return res.sendStatus(500);
  }
});

module.exports = app;
