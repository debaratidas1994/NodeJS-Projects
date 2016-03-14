//Required modules
var http=require('http');
var url=require('url');
var path=require('path');
var fs=require('fs');

//Mime Type Object : this will specify what kind of parsing will be done
//given we know the extension of object

var mimeTypes={
	"html":"text/html",
	"jpeg":"image/jpeg",
	"jpg":"image/jpeg",
	"png":"image/png",
	"js":"text/javascript",
	"css":"text/css"
};
http.createServer(function(req,res){
	var uri = url.parse(req.url).pathname;
	//current working dir of process 
	var fileName=path.join(process.cwd(),unescape(uri));
	console.log("loading "+uri);
	var stats;
	// check for page requested for
	try{
		stats=fs.lstatSync(fileName);

	}catch(e)
	{
		res.writeHead(404,{'Content-Type':'text/plain'});
		res.write("404 not found\n");
		res.end();
		return;
	}
	//check if file or directory
	if(stats.isFile()){
		var mimeType=mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200,{"Content-Type":mimeType});

		var fileStream=fs.createReadStream(fileName);
		fileStream.pipe(res);

	}else if(stats.isDirectory()){
		res.writeHead(302,{"Location":"index.html"});
		res.end();

	}else{
		res.writeHead(500,{"Content-Type":"text/plain"});
		res.write("500 Internal Error");
		res.end();

	}

}).listen(1337);

