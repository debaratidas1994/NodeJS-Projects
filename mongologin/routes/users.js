var express = require('express');
var router = express.Router();
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// now since we are in users route, this literally means
//users/register
//getting the information
router.get('/register', function(req, res, next) {
  res.render('register',{
  	'title':'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login',{
  	'title':'Login'
  });
});
//what happens when you submit the information
//post request
router.post('/register', function(req, res, next) {
  //get form values
  var name=req.body.name;
  var email=req.body.email;
  var username=req.body.username;
  var password=req.body.password;
  var password2=req.body.password2;

//check for image field
if(req.files && req.files.profileimage)
{
	console.log("uploading File....");
	//File info
	var profileImageOriginalName=req.files.profileimage.originalname;
	var profileImageName=req.files.profileimage.name;
	var profileImageMime=req.files.profileimage.mimetype;
	var profileImagePath=req.files.profileimage.path;
	var profileImageExt=req.files.profileimage.extension;
	var profileImageSize=req.files.profileimage.size;

} else {
	var profileImageName="noimage.png";
}
//Form Validation
// field, error message
req.checkBody('name','Name field is required').notEmpty();
req.checkBody('email','Email invalid').isEmail();
req.checkBody('username','Username field is required').notEmpty();
req.checkBody('password','Password field is required').notEmpty();
req.checkBody('password2','Passwords dont match').equals(req.body.password);

//Check for Error
var errors=req.validationErrors();
if(errors){
	res.render('register',{
		errors:errors,
		//this we do so they dont have to re enter data again
		name:name,
		email:email,
		username:username,
		password:password,
		password2:password2

	});

}else{
	//get the object
	var newUser=new User({
		name:name,
		email:email,
		username:username,
		password:password,
		profileimage:profileImageName
	});
	//Create User : send to model function
	User.createUser(newUser,function(err,user){
		if(err) throw err;
		console.log(user);

	});
	//Send flash message
	//Success Message
	req.flash('Success','You are registered and may login!');
	res.location('/');
	res.redirect('/');
}

});// post ends

//to maintain across sessions 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
	function(username,password,done)
	{
		User.getUserByUserName(username,function(err,user){
			if(err) throw err;
			if(!user){
				//not present in local db
				console.log("Unknown user!");
				return done(null,false,{message:'Unknown user'});
			}
			User.comparePassword(password,user.password,function(err,isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null,user);
				}else{
					console.log("Invalid password!");
					return done(null,false,{message:"Invalid password"});
				}
			});
		});
	}
	));


router.post('/login',passport.authenticate('local',{
		failureRedirect:'/users/login',failureFlash:'Invalid username or password'}),
function(req,res){
	// will run if localstrategy is successful
	console.log('Authentication successful!');
	req.flash('success','You are logged in');
	res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success','You have logged out!');
  res.redirect('/users/login');
});

module.exports = router;
