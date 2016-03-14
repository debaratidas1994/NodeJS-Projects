var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//this displays index.jade file
  res.render('index', { title: 'Members' });
});

module.exports = router;
