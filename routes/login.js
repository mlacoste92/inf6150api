var express = require('express');
var Login = require('../models/login');
var router = express.Router();

router.route('/login/').post(function(req,res,next){
    if(req.body == null || Object.keys(req.body).length === 0) {
		res.status(400).send({"error" : "Aucune donnée reçue"});
		return;
	}
var newUser = Login(req.body);
	newUser.save(function(errSave){
				if (errSave.error) {
					console.log("lolipop");
					res.status(500).send({"error": errSave});
	  			} else {
					res.status(200).send({"counter":newUser.counter});
	  			}
			});

});


router.route('/login/:id').get(function(req, res, next) {
  	var id = req.params.id;
    if(!id){
	    res.status(400).send({"error" : "Le id est requis"});
	    return;
    }

    Login.findOneAndUpdate({"userId":id},{$inc: {counter: 1 }},{upsert:true,'new': true}, function(err, userLogin) {
	  	if (err) {
			res.status(500).send({"error": err});
	  	} else if(userLogin) {
			res.status(200).send({"counter":userLogin.counter});
		}
	});

});


module.exports = router;
