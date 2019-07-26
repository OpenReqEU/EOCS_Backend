/*var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors =  require('./cors');


//var pg = require('pg').Pool();

//configurar cabeceras http
app.use(cors.permisos);

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
*/
/*
const connectionData = {
  user: 'postgres',
  host: '193.146.116.148',
  database: 'ex_vote_dev',
  password: 'postgres',
  port: 5432,
}
*/
/*
const client = new Client(connectionData)

//console.log("imprimiendo...")
console.log(client)


var rsclient = client.connect()
console.log(rsclient)

client.query('SELECT * FROM projects')
    .then(response => {
        console.log(response.rows)
        client.end()
    })
    .catch(err => {
	console.log("error")
        client.end()
    })

*/


const pg = require('pg');
const pool = new pg.Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'ex_vote_dev',
	password: 'postgres',
	port: '5432'
});


pool.query("DELETE FROM projects where title='OpenReq'", (err, res) => {
	console.log(err, res);
	
});

pool.query("DELETE FROM tickets where project_id=1", (err, res) => {
	console.log(err, res);
	
});

pool.end();


/*
var connectionString = "postgres://postgres:postgres@localhost:5432/ex_vote_dev";

var client = new pg.Client(connectionString);
client.connect();


var query = client.query("SELECT * FROM projects");
//fired after last row is emitted

console.log(query);
*/

/*
app.get('/', function (req, res, next) {
    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM projects',function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});
*/

/*
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
*/
