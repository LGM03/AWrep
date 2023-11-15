var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const sessionStore = new MySQLStore({  //donde alamceno las sesiones
  host: "localhost",
  user: "root",
  password: "",
  database: "viajes"
});

//Manejos de sesiones

const middlewareSession = session({
  saveUninitialized: false,
  secret: "foobar34",
  resave: false,
  store: sessionStore
});

var indexRouter = require('./routes/index');
var destinoRouter = require('./routes/destino')
var reservarRouter = require('./routes/reservar');
var usuarioRouter = require('./routes/usuario')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middlewareSession);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//estaba a false, lo cambio a true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.usuario = req.session.usuario ||null;
  next();
});

app.use('/', indexRouter);
app.use('/destino',destinoRouter);
app.use('/reservar',reservarRouter);
app.use('/user',usuarioRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render ventana de error
  res.status(err.status || 500);
  res.render('error',{error : err});
});

module.exports = app;