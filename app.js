var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bluebird = require('bluebird');
var mongoose = require('mongoose');
//var config = require('./localConfig/localConfig');
var config = require('./config/globalConf');
var index = require('./routes/index');
var users = require('./routes/users');
var drive = require('./routes/drive');
var investors = require('./routes/investors');
var projects = require('./routes/projects');
var socket_io = require('socket.io')();
var app = express();
app.socktIO =socket_io;




//mongo connection
mongoose.Promise=bluebird;
mongoose.connect(config.database)
    .then(()=>{
        console.log('Connection to mongo  at db budget was succesfull')
    })
    .catch(()=>{
        console.log('error while trying to connect to mongodb')
    });

//settingup secret for jwt
app.set('superSecret',config.secret);

//CORS configuration
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, " +
        "Origin,Accept, " +
        "X-Requested-With, " +
        "Content-Type, " +
        "Access-Control-Request-Method," +
        "Access-Control-Request-Headers," +
        "x-access-token,referer");

    next();

});
app.socktIO.on('connection',(socket)=>{
    console.log('user connected');

});
app.socktIO.on('disconnect', function() {
    console.log('user disconnected');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('io',socket_io);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw({type:'*/*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/drive',drive);
app.use('/investor',investors);
app.use('/projects',projects);


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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
