var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routeIndex = require('./routes/index');
var routeCampings = require('./routes/campings');

var db = require('./utils/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routeIndex);
app.use('/', routeCampings);

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
/* LA DB N'EST PAS ENCORE CRÉEE */

db.init('mongodb://admin:admin@ds137101.mlab.com:37101/camping', function(err) {
	if (err) {
		logger.error("Error : Unable to connect to Mongo ");
		console.log('Unable to connect to Mongo.')
		process.exit(1)
	}
});


module.exports = app;
