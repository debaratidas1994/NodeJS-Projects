
'use strict';
var mongoose=require("mongoose");
var db=function(){
	return{
		config:function(conf){
			mongoose.connect("mongodb://localhost/coursebooks");
			var db=mongoose.connection;
			db.on("error",console.error.bind(console,"Connection Error"));
			db.once("open",function(){
				console.log("Data base is open!");
			});
		}
	};
}
//export the db function across all modules
module.exports=db();