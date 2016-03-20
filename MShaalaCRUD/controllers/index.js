'use strict';
//te controller asks the model for bookModel;
//the model returns bookModel with its schema to,
//to the controller under the name "Book"
var Book = require('../models/bookModel');


module.exports = function (router) {
    router.get('/', function (req, res) {
   //mongoose function find to take out from db
   //find an object
    Book.find({},function(err,books){
    	if(err){
    		console.log(err);
    	}
        //books.forEach(function(book){
           // book.truncText=book.truncText(50);
        //});
    	//if successful put it in model
    	var model={
    		books:books
    	}
    	res.render('index', model);
    });
        
        
        
    });

};