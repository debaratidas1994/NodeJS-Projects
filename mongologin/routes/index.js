var express = require('express');
var router = express.Router();

/* GET home page. */
//Members page
router.get('/', ensureAuthenticated,function(req, res, next) {
	//this displays index.jade file
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req,res,next)
{
	if(req.isAuthenticated()){
		return next();
		//move to next middleware
	}
	res.redirect('/users/login');
}
module.exports = router;
