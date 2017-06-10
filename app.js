var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routeIndex = require('./routes/index');
var routeCampings = require('./routes/campings');
var routeServices = require('./routes/services');
var routeActivities = require('./routes/activities');
var routeLogin = require('./routes/login');

var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', routeIndex);
app.use('/', routeCampings);
app.use('/', routeServices);
app.use('/', routeActivities);
app.use('/', routeLogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status = err.status || 500;
	res.render('error', {
		message: err.message,
		error: err
	});
	return;
});

mongoose.connect('mongodb://admin:admin@ds137101.mlab.com:37101/camping');

module.exports = app;
