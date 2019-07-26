
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


var url_mongo = "mongodb://193.146.116.148:27017/";


const pg = require('pg');
var data_pg = {
	user: 'postgres',
	host: '193.146.116.148',
	database: 'ex_vote_dev',
	password: 'postgres',
	port: '5432'
};


const port = process.env.PORT || 3000;

app.delete('/requirement', function (req, res) {
	MongoClient.connect(url_mongo, function(err, db) {
	  if (err) return res.status(500).json(err);
	  var queryReq = req.query;
	  var param = null;
	  if (queryReq.hasOwnProperty("requirement")){
		param = queryReq.requirement;
		console.log('Requirement to delete :' + param);
		var query = {"status_id" : param};
		const dbo = db.db('twitter_data');
	  
		dbo.collection('tweet').deleteOne((query),function(err) {
			if (err) {
				return res.status(500).json(err);
			}
		});
		console.log("Requirement deleted");
		db.close();
		res.json({"result": "Delete"});

	  }else{
		  db.close();
		  res.json({"result": "Not found"});
	  }
	});
})

app.delete('/requirements', function (req, res) {
	MongoClient.connect(url_mongo, function(err, db) {
	  if (err) return res.status(500).json(err);
	  var queryReq = req.query;
	  var param = null;
	  if (queryReq.hasOwnProperty("account")){
		param = queryReq.account;
		var query = {"in_reply_to_screen_name" : param};
		const dbo = db.db('twitter_data');
	  
		dbo.collection('tweet').remove((query),function(err) {
			if (err) {
				return res.status(500).json(err);
			}
		});
		console.log("Requirements deleted");
		db.close();
		res.json({"result": "Delete"});

	  }else{
		  db.close();
		  res.json({"result": "Not found"});
	  }
	});
})

app.delete('/edemocracyProject', function (req, res) {
	const pool = new pg.Pool(data_pg);
	var queryReq = req.query;
	var project = null;
	var id = null;
	if (queryReq.hasOwnProperty("project")){
		project = queryReq.project;
	}
	if (queryReq.hasOwnProperty("id")){
		id = queryReq.id;
	}
	
	if(!id || !project){
		return res.status(400).json({"result": "Incorrect params"});
	}
	
	pool.query("DELETE FROM projects where title='" + project + "'", (err, res) => {
		console.log(err, res);
		if (err) {
			return res.status(500).json(err);
		}		
	});

	pool.query("DELETE FROM tickets where project_id=" + id, (err, res) => {
		console.log(err, res);
		if (err) {
			return res.status(500).json(err);
		}		
	});

	pool.end();
	res.json({"result": "Delete"});
})

function uppercaseFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});

