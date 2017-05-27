// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var campingSchema = new Schema({
	name: { type: String, required: true },
	address: { type: String, required: true},
	telephone: { type: String, required: true},
	postalCode: { type: String, required: true},
	province: { type: String, required: true},
	geolocalisation: {
	  lat: { type: String, required: true },
	  lng: { type: String, required: true }
	},
	activities:[{ 
		_id:false,
		id: { type: String, required: true },
		name : { type: String, required: true }
	}],
	services:[{ 
		_id: false,
		id: { type: String, required: true },
		name : { type: String, required: true }
	}],
	details: String,
    comments: [{
	  userId: { type: String, required: true},
	  message: { type: String, required: true },
	  rating: Number
	}],
	created_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Camping = mongoose.model('Camping', campingSchema);

// make this available to our users in our Node applications
module.exports = Camping;