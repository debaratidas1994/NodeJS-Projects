var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
//tell mongoose which db to connect to!
mongoose.connect('mongodb://localhost/nodeauth');
var db=mongoose.connection;

//User Schema

var UserSchema=mongoose.Schema({

	username:{
		type:String,
		index:true
	},
	password:{
		type:String,required:true,
		bcrypt:true
	},
	email:{
		type:String,
		
	},
	name:{
		type:String,
		
	},
	profileimage:{
		type:String,
		
	}

});

//makes this object available outside this file
var User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserByUserName=function(username,callback){
	var query={username:username};
	User.findOne(query,callback);
}

module.exports.createUser=function(newUser,callback){
	bcrypt.hash(newUser.password,10,function(err,hash){
		if(err) throw err;
		//Set hashed pw
		newUser.password=hash;
		//Create USer
		newUser.save(callback);
	});
	
}