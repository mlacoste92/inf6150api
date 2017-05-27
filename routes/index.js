var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET Page d'accueil. */
router.get('/', function(req,res,next) {
    res.sendFile("./views/index.html");
});

module.exports = router;
