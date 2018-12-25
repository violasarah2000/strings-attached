'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'sql177.main-hosting.eu',
    user     : 'u575780080_stra',
    password : 'strapass',
    database : 'u575780080_stra'
});

connection.connect(function(err) {
  if(!err) {
    console.log("Database is connected ...");
  } else {
    console.log("Error connecting database ...");
  }
});

module.exports = connection;
