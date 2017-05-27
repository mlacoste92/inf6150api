var express = require('express');
var Service = require('../models/service');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.route('/services').get(function(req, res, next) {
  Service.find({}, function(err, services) {
	if (err) {
	  res.status(500).send({"error": err});
	} else {
	  res.json(services);
	}
  });
}).post(function(req,res,next){
    if(req.body == null || Object.keys(req.body).length === 0) {
		res.status(400).send({"error" : "Aucune donnée reçue"});
		return;
	}
	var newService = Service(req.body);
		
	newService.save(function(err) {
	  if (err) {
		res.status(500).send({"error": err});
	  } else {
		res.status(200).json(newService);
	  }
	});
});

router.route('/services/:id').get(function(req,res,next){
    var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
    }
    var objectId = ObjectID(id);
    Service.findById(objectId, function(err, service) {
	  if (err) {
		res.status(500).send({"error": err});
	  } else {
		res.status(200).json(service);
	  }
	});
});

module.exports = router;
