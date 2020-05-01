console.log("Silly rabbit, tricks are for kids!");

// Dependencies
const mysql = require("mysql");
const express = require("express");
const app = express();
const inquirer = require("inquirer");
const env = require("./.env");


//connecting express
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//connection mySQL
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

// questions for generic employee data
const employeeData =
      [
        {
            type: "input",
            name: "firstname",
            message: "What is your first name?"
        },

        {
            type: "input",
            name: "lastname",
            message: "What is your last name?"
        },

      
        {
            type: "list",
            message: "What is your job title?",
            name: "title",
            choices: [
              "Ride Operator", 
              "Game Attendant", 
              "Ride Engineer",
              "Security",
              "Manager",
              "Ticket Sales",
              "Actor",
              "Acrobat",
              "Magician"
            ],
        },   
        {   
            type: "list",
            name: "department",
            message: "What is your department?",
            choices: [
              "Office",
              "Grounds",
              "Entertainment"
            ],
        },
        {        
            type: "input",
            name: "salary",
            message: "What is your salary?"
        }
      ];

  //start application here
      manageEmployees = () => {
        inquirer
          .prompt([
            {
              type: "list",
              message: "What would you like to do?",
              choices: ["Add Employee", 
              "Update Employee Information", 
              "Delete Employee", 
              "Exit"],
              name: "options",
            },
          ])

//This response will build a new employee in the database
      .then((response) =>  {
          const databaseInput = response.options;
          switch (databaseInput) {
              case "Add Employee":
                  inquirer
                  .prompt(employeeData)
                  .then((answer) => {
  //connects to mySQL database to get employee info    
      var query = connection.query([
        
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname
        },
    
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary
        },
        "INSERT INTO department SET ?",
        {
          dept_name: answer.department
        }],
      
        function(err, res) {
          console.log("does it work here?");
          console.log(res);
          // if (err) throw err;
          // res.length > 0 && console.table(res);
          // console.table(query);
         
        }) 
      })
      break;
      //uses mysql database to update an employees info
        case "Update Employee Information":
          inquirer
                  .prompt([
                      {
                        type: "input",
                        message: "Which Employee would you like to update?",
                        name: "employeeID",
                      },
                    ])
                  .then((answer) => {
              if (answer === employee_id) {
                    inquirer
                      .prompt([
                        {
                          type: "input",
                          message: "Change first name",
                          name: "changeFirstName"
                        },
                        {
                         type: "input",
                         message: "Change last name",
                         name: "changeLastName" 
                        },
                        {
                          type: "list",
                          message:"Change job title",
                          name: "changeTitle",
                          choices: [
                            "Ride Operator", 
                            "Game Attendant", 
                            "Ride Engineer",
                            "Security",
                            "Manager",
                            "Ticket Sales",
                            "Actor",
                            "Acrobat",
                            "Magician"
                          ],
                        },
                        {
                          type: "list",
                          message: "Change deptartment",
                          name: "changeDepartment",
                          choices: [
                            "Office",
                            "Grounds",
                            "Entertainment"
                          ],
                        },
                        {
                          type: "input",
                          message: "Change salary",
                          name: "changeSalary", 
                        }
                      ])
                    }
              var query = connection.query([
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    first_name: answer.changeFirstName
                  },
                  {
                    last_name: answer.changeLastName
                  }
                ],
                "UPDATE role SET ? WHERE ?",
                [
                  {
                    title: answer.changeTitle
                  },
                  {
                    salary: answer.changeSalary
                  }
                ], 
                "UPDATE department SET ? WHERE ?",
                [
                  {
                    dept_name: answer.changeDepartment
                  }
                ]
              ],
          function(err, res) {
            if (err) throw err;
            res.length > 0 && console.table(res);
            console.table(query);
            manageEmployees();
          })
        }) 
        break;
        //this will allow a user to delete an employee
        case "Delete Employee":
          inquirer
                  .prompt([
                      {
                        type: "input",
                        message: "Which Employee would you like to delete?",
                        name: "employeeDel",
                      },
                    ])
                  .then((answer) => {
              if (answer === employee_id) {
               
              var query = connection.query(
                [
                 "DELETE FROM employee WHERE ?",
                {
                  employee_id: answer.employeeDel
                }
               ],
          function(err, res) {
            if (err) throw err;
            res.length > 0 && console.table(res);
            console.table(query);
            manageEmployees();
          })
        } 
      }) 
      break; 
      //this end the application from running
      case "Exit":
          connection.end();
          break;
        default:
          break;
        //END FUNCTIONS ... DO NOT TOUCH CLOSING SYNTAX
      }
    });
  }
  
manageEmployees();
