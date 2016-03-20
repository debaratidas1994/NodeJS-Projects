'use strict';
var mongoose=require('mongoose');

var bookModel=function(){
	var bookSchema=mongoose.Schema({
		title:String,
		description:String,
		category:String,
		institute:String,
		sponsor:String,
		price:Number,
		cover:String
	});
	//helper function to shorten text
	//bookSchema.methods.truncText=function(Length){
		//return this.description.substring(0,length);
	//};
	//name of model and schema
	return mongoose.model('Book',bookSchema);
};

module.exports=new bookModel();