//dependencies
const mysql = require("mysql");
const express = require("express");
const app = express();
const inquirer = require("inquirer");
const env = require("../.env");
const employeeCMS = require("../app.js");
//connecting express
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Sets up mysql
const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: 3306,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: "employee_cmsDB"
});

connection.connect(function (err) {
    console.log("SQL connected as id " + connection.threadId)
  }); 
  
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

 