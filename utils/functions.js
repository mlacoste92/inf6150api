var http = require('http');
var Service = require('../models/service');
var Activity = require('../models/activity');


module.exports = {
  verifyActivitiesServices: function (oBody,fnCallback) {
	var isValid = {"success":true};
	Activity.find({},function(err,activities){
		Service.find({},function(err,services){
			if(oBody.activities) {
				for (i = 0; i < oBody.activities.length; i++) { 
    				var oActivity = activities.filter(function(oActivity){
						return oActivity._id = oBody.activities[i].id;
					})
					console.log(oActivity);
					if(oActivity.length == 0) {
						isValid.success = false;
						isValid.item = oBody.activities[i].name;
						break;
					}
				}
			}
			if(oBody.services && isValid.success){
				for (i = 0; i < oBody.services.length; i++) { 
    				var oService = services.filter(function(oService){
						return oService._id = oBody.services[i].id;
					})
					console.log(oService);
					if(oService.length == 0) {
						isValid.success = false;
						isValid.item = oBody.services[i].name;
						break;
					}
				}
			}
			fnCallback(isValid);
		});
	});
  }
};