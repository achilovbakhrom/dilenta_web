let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let login = require('./routes/login');
let register = require('./routes/register');
let shop = require('./routes/shop');
let product = require('./routes/product');
let cart = require('./routes/cart');
let contacts = require('./routes/contacts');
let checkout = require('./routes/checkout');
// require('./model/User');
let app = express();
let db = require("./db");

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
app.use('/cart', cart);
app.use('/contacts', contacts);
app.use('/checkout', checkout);


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
  res.render('error', {message: err.message});
});

db.connect("mongodb://localhost:27017/dilenta", function (err){
  if(err){
        console.log(err);
        return res.sendStatus(500);
  }
});

module.exports = app;
