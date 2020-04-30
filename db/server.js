const employeeCMS = require("../employee-CMS.js") 
const mysql = require("mysql");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Weezer00!",
  database: "employee_cmsDB"
});

connection.connect(function (err) {
    console.log("SQL connected as id " + connection.threadId)
  }); 
  
  // connection.query('SELECT * from employee', function (err, res) {
  //   if (err) throw err;
  //   console.table(res)
  // });
  
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });