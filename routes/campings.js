var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var db = require('../utils/db');

router.route('/campings').get(function(req, res, next) {
	//db.get().collection('campings').find(find_filters).toArray(function(err, campings){
	db.get().collection('campings').find().toArray(function(err, campings){
		res.json(campings);
	});
}).post(function(req,res,next){
    if(req.body == null || Object.keys(req.body).length === 0) {
		res.status(400).send({"error" : "Aucune donnée reçue"});
		return;
	}
	db.get().collection('campings').insert(req.body, function(err, camping){
	    if (err) {
		    res.status(500).send({"error": err});
		} else {
			res.status(200).json(camping.ops[0]);
		}
	});
});

router.route('/campings/:id').put(function(req,res,next) {
    var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
    }
								  console.log(req.body);
    if(req.body == null || Object.keys(req.body).length === 0) {
        res.status(400).send({"error" : "Aucune donnée reçue"});
	    return;
    }
    var objectId = ObjectID(id);
    db.get().collection('campings').findAndModify({_id:objectId},[], {$set:req.body},{new:true}, function(err, camping) {
	    if (err) {
		    res.status(500).send({"error": err});
	    } else if(!camping.lastErrorObject.updatedExisting) {
		    res.status(404).send({"error":"Le camping n'existe pas."});
	    } else {
		    res.status(200).json(camping.value);
	    }
    });
}).get(function(req,res,next){
    var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id doit être un string de 24 caractères hexadécimaux."});
	    return;
    }
    var objectId = ObjectID(id);
    db.get().collection('campings').findOne({_id:objectId}, function(err, camping) {
	    if (err) {
		    res.status(500).send({"error": err});
	    } else if(!camping) {
		    res.status(404).send({"error":"Le camping n'existe pas."});
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
	db.get().collection('campings').findOne({_id:objectId}, function(err, camping) {
	    if (err) {
		    res.status(500).send({"error": err});
		} else if(!camping) {
			res.status(404).send({"error":"Le camping n'existe pas."});
		} else {
			if(camping.comments) {
			    camping.comments.push(req.body);
			} else {
				camping.comments = [req.body]
			}
			db.get().collection('campings').findAndModify({_id:objectId},[], {$set:camping},{new:true}, function(err, campingUpdated) {
			    res.status(200).json(campingUpdated.value);
			});
		}
	});
});

module.exports = router;
