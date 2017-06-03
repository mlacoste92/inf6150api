var express = require('express');
var Camping = require('../models/camping');
var Functions = require('../utils/functions');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.route('/campings').get(function(req, res, next) {
	var filter = {};
	if(req.query.activities) {
		var activitiesFiltered = req.query.activities.split(",");
		var sElemMatch = "";
		for (i = 0; i < activitiesFiltered.length; i++) {
			sElemMatch += (sElemMatch == "") ? "\"id\" : \"" + activitiesFiltered[i] + "\"" : ", \"id\" : \"" + activitiesFiltered[i]+ "\"";
		}
		sElemMatch = "{ \"$elemMatch\" :{ " + sElemMatch + "}}";
		filter.activities = JSON.parse(sElemMatch);
	}

	if(req.query.services) {
		var servicesFiltered = req.query.services.split(",");
		var sElemMatch = "";
		for (i = 0; i < servicesFiltered.length; i++) {
			sElemMatch += (sElemMatch == "") ? "\"id\" : \"" + servicesFiltered[i] + "\"" : ", \"id\" : \"" + servicesFiltered[i]+ "\"";
		}
		sElemMatch = "{ \"$elemMatch\" :{ " + sElemMatch + "}}";
		filter.services = JSON.parse(sElemMatch);
	}

	if(req.query.name){
		filter.name = req.query.name;
	}

  	Camping.find(filter, function(err, campings) {
		if (err) {
	  		res.status(500).send({"error": err});
		} else {
		  	res.json(campings);
		}
  	});
}).post(function(req,res,next){
    if(req.body == null || Object.keys(req.body).length === 0) {
		res.status(400).send({"error" : "Aucune donnée reçue"});
		return;
	}
	var newCamping = Camping(req.body);
	Functions.verifyActivitiesServices(req.body,function(oSuccess) {
		if(oSuccess.success){
			newCamping.save(function(err) {
	  			if (err) {
					res.status(500).send({"error": err});
	  			} else {
					res.status(200).json(newCamping);
	  			}
			});
		} else {
			res.status(400).send({"error": "The following activity or service is not valid : " + isValid.item });
		}
	});	
});

router.route('/campings/:id').put(function(req,res,next) {
    var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
    }

    if(req.body == null || Object.keys(req.body).length === 0) {
        res.status(400).send({"error" : "Aucune donnée reçue"});
	    return;
    }
    var objectId = ObjectID(id);
	Functions.verifyActivitiesServices(req.body,function(oSuccess) {
		if(oSuccess.success){			  
			Camping.findOneAndUpdate({_id:objectId},req.body,{new: true}, function(err, camping) {
	  			if (err) {
					res.status(500).send({"error": err});
	  			} else {
					res.status(200).json(camping);
	  			}
			});
		} else {
			res.status(400).send({"error": "The following activity or service is not valid : " + oSuccess.item });
		}
	});
}).get(function(req,res,next){
    var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
    }
    var objectId = ObjectID(id);
    Camping.findById(objectId, function(err, camping) {
	  if (err) {
		res.status(500).send({"error": err});
	  } else {
		res.status(200).json(camping);
	  }
	});
});

router.route('/campings/:id/comments').post(function(req,res,next){
    var id = req.params.id;
	if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
	}
	if(req.body == null || Object.keys(req.body).length === 0) {
	    res.status(400).send({"error" : "Aucune donnée reçue"});
		return;
	}
											
	var objectId = ObjectID(id);
											
	Camping.findById(objectId, function(err, camping) {
	  var existingComment = camping.comments.filter(function(sComment){
			return sComment.userId == req.body.userId;
	  });

	  if(existingComment.length > 0){
		res.status(400).send({"error": "This user has already commented the specified camping"});
	  } else {
	  	if (err) {
			res.status(500).send({"error": err});
	  	} else {
			if(camping.comments) {
		  		camping.comments.push(req.body);
			} else {
		  		camping.comments = [req.body]
			}
			camping.save(function(errSave){
		  		if (errSave) {
					res.status(500).send({"error": errSave});
		  		} else {
			  		res.status(200).send(camping);
		  		}
			});
	  	}
	  }
	});
});

module.exports = router;
