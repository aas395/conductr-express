var express = require('express');
var router = express.Router();
var cors = require('cors')

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
	var watson = require('watson-developer-cloud');

	var authorization = new watson.AuthorizationV1({
	  username: process.env.STT_USERNAME,
	  password: process.env.STT_PASS,
	  url: watson.SpeechToTextV1.URL
	});	

	authorization.getToken(function (err, token) {
	  if (!token) {
	    console.log('error:', err);
	  } else {
	    // Use your token here
	    res.send(token);
	  }
	});

  
});

module.exports = router;
