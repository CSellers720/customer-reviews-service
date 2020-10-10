const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "newuser",
  password: "password",
  database: "fec_reviews"
});

connection.connect(function(err){
  if (err) throw err;
  console.log('Connected to the dataBase!');
});

module.exports = connection;
