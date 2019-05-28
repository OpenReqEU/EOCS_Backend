
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors =  require('./cors');

var MongoClient = require('mongodb').MongoClient;


//configurar cabeceras http
app.use(cors.permisos);

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var url = "mongodb://193.146.116.148:27017/";
const port = process.env.PORT || 3000;

app.get('/projects', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  const dbo = db.db('twitter_data')
	  dbo.collection('observable_twitter').find().toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.json(result);

	    db.close();
	  });
	});
	
});

app.get('/requirements', function (req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var queryReq = req.query;
	  var param = null;
	  if (queryReq.hasOwnProperty("project")){
		param = queryReq.project;
	  }
	  var query = param !== null ? {"in_reply_to_screen_name" : uppercaseFirstLetter(param)} : {};
	  const dbo = db.db('twitter_data')
	  dbo.collection('tweet').find(query).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.json(result);

	    db.close();
	  });
	});
	
});


app.delete('/requirement', function (req, res) {
	console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var queryReq = req.query;
	  var param = null;
	  console.log('endpoint delete llamado');
	  if (queryReq.hasOwnProperty("requirement")){
		param = queryReq.requirement;
		console.log('Requirement to delete :' + param);
		var query = {"status_id" : param};
		const dbo = db.db('twitter_data');
	  
		dbo.collection('tweet').deleteOne(query),function(err, result) {
			if (err) throw err;
			//console.log(result);
			console.log("1 document deleted");
			res.json({"result": "Delete"});

			db.close();
		};
	  }else{
		  res.json({"result": "Not found"});
		  db.close();
	  }
	});
	console.log("fin metodo");
})

function uppercaseFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});

