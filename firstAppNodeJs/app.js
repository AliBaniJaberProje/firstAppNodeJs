var createError = require('http-errors');
var express = require('express');
var path=require('path');
var logger = require('morgan');
const cors=require('cors');
const mongoose=require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter=require('./routes/product');
const orderRouter=require('./routes/orderRouter');
var app = express();
app.use(cors());
app.use(logger('dev'));


mongoose.connect('mongodb://localhost/shopping_api:27017',{useNewUrlParser: true ,  useUnifiedTopology: true},(error)=>{
  if(error)
  {
    console.log(error);
    return ;
  }
  else
  {
    console.log("conected");
  }
});

app.use(express.urlencoded({extended:true}));//
app.use(express.json());//
app.use(express.static(path.join(__dirname,'productImage')))///image

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);
app.use('/order',orderRouter);

app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message : err.message
  })
});
module.exports = app;


// var path = require('path');
// var cookieParser = require('cookie-parser');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
