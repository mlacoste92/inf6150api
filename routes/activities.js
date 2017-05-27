var express = require('express');
var Activity = require('../models/activity');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.route('/activities').get(function(req, res, next) {
  Activity.find({}, function(err, activities) {
	if (err) {
	  res.status(500).send({"error": err});
	} else {
	  res.json(activities);
	}
  });
}).post(function(req,res,next){
    if(req.body == null || Object.keys(req.body).length === 0) {
		res.status(400).send({"error" : "Aucune donnée reçue"});
		return;
	}
	var newActivity = Activity(req.body);
		
	newActivity.save(function(err) {
	  if (err) {
		res.status(500).send({"error": err});
	  } else {
		res.status(200).json(newActivity);
	  }
	});
});

router.route('/activities/:id').get(function(req,res,next){
    var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
    }
    var objectId = ObjectID(id);
    Activity.findById(objectId, function(err, activity) {
	  if (err) {
		res.status(500).send({"error": err});
	  } else {
		res.status(200).json(activity);
	  }
	});
});

module.exports = router;
