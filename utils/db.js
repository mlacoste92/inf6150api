var client = require('mongodb').MongoClient;
var url = 'mongodb://admin:admin@ds137101.mlab.com:37101/camping';
var database;

// Use connect method to connect to the Server
exports.init = function(url, done) {
	client.connect(url, function(err, db) {
		if (err){
			return done(err);
		}
		database = db
		done()
	})
}

exports.get = function() {
	return database;
}