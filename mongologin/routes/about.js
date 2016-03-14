var express = require('express');
var router = express.Router();

/* GET home page. */
//We are using the / as we are using its only route
router.get('/', function(req, res, next) {
	//this displays index.jade file
  res.render('about', { title: 'About' });
});

module.exports = router;
