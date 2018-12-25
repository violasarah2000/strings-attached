'user strict';

var mysql = require('mysql');

//local mysql db connection
var dbConfig = {
    connectionLimit : 100,
    host     : 'sql177.main-hosting.eu',
    user     : 'u575780080_stra',
    password : 'strapass',
    database : 'u575780080_stra'
};

var pool = mysql.createPool(dbConfig);

pool.getConnection(function (err, connection) {
  if (err) {
    connection.release();
    console.log("Error connecting database ...");
    throw err;
  } else {
    console.log("Database is connected ...");
  }
})
module.exports = pool;
// var connection;
// function handleDisconnect() {
//   connection = mysql.createConnection(dbConfig);
//
//   connection.connect(function(err) {
//     if(!err) {
//       console.log("Database is connected ...");
//     } else {
//       console.log("Error connecting database ...");
//       setTimeout(handleDisconnect, 2000);
//     }
//   });
//
//   connection.on('error', function(err) {
//     if(err.code !== 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       throw err;                  // lost due to either server restart, or a
//     }
//     if(!err.fatal) { // Connection to the MySQL server is usually
//       return;                   // lost due to either server restart, or a
//     }
//     console.log('Attempting to re-connect with SQL.');
//     handleDisconnect();
//   });
//   module.exports = connection;
// }
// handleDisconnect();
