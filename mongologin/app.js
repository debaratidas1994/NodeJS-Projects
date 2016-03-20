var express = require('express');
//so we can use path.join, so we load it
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
//needed modules
var session=require('express-session')
//auth
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy;
//this is needed to parse the body of request
var bodyParser = require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
//define routes 
var routes = require('./routes/index'); // homepage
var users = require('./routes/users'); // reg form and login form
//instantiate express object into app // core instance
var app = express();

// view engine setup : im using jade so use this
app.set('view engine', 'jade');
//current folder+join+string views
app.set('views', path.join(__dirname, 'views'));
//Handle File uploads
//all the upload destination is in a new folder called uploads
app.use(multer({dest:'./uploads'}).single('singleInputFileName'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//middleware register !
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Handle Express Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));
//Passports
app.use(passport.initialize());
app.use(passport.session());
//Express Validators
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//connect flashes
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//to make sure that once ur logged in u are not asked to register
app.get('*', function(req, res, next) {
  res.locals.user=req.user||null;
  next();
});


//if you are in home page : call routes
app.use('/', routes);


app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
