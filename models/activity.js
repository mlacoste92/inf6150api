// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var activitySchema = new Schema({
	name: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Activity = mongoose.model('Activity', activitySchema);

// make this available to our users in our Node applications
module.exports = Activity;