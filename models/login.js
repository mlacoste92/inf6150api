// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var loginSchema = new Schema({
	_id:false,
	userId: { type: String, required: true},
	counter: { type:Number, default:1 }
});

// the schema is useless so far
// we need to create a model using it
var Login = mongoose.model('Login', loginSchema);

// make this available to our users in our Node applications
module.exports = Login;