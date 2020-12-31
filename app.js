console.log("Silly rabbit, tricks are for kids!");

// Dependencies  -- express is only when front end is used
const mysql = require("mysql");
const inquirer = require("inquirer");
require('dotenv').config()


//connection mySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employee_cmsDB"
});

 connection.connect(function (err) {
   if (err) throw err
  console.log("SQL connected as id " + connection.threadId)
  manageEmployees();
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
            type: "input",
            message: "What is your job role ID?",
            name: "roleID",
            
        },   
       
        {        
            type: "input",
            name: "salary",
            message: "What is your salary?"
        },
        {
          type: "input",
          message: "What is your Manager's ID?",
          name: "managerID",
          
      },  
      ];

  //start application here
      manageEmployees = () => {
        inquirer
          .prompt([
            {
              type: "list",
              message: "What would you like to do?",
              choices: ["View Employee", "Add Employee", 
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
        //this insert must match the create employee table in the schema
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.roleID,
          salary: answer.salary,
          manager_id: answer.managerID
        }],
      
        function(err, res) {
          console.log("does it work here?");
         
          if (err) throw err;
          // console.table(query);
         manageEmployees();
        }) 
        console.log(query.sql);
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
  

