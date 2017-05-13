var express = require('express');
var router = express.Router();
var path    = require("path");
var db = require('../utils/db');

/* GET Page d'accueil. */
router.get('/', function(req,res,next) {
    res.sendFile("./views/index.html");
});

module.exports = router;
