console.log("Silly rabbit, tricks are for kids!");

// Dependencies  -- express is only when front end is used
const mysql = require("mysql");
const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
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
          message: "What is your Manager's ID?",
          name: "managerID",
          
      },  
      ];

      const roleData =
      [
        {
            type: "input",
            name: "title",
            message: "What is your role?"
        },

        {
            type: "input",
            name: "salary",
            message: "What is your salary?"
        },

      
        {
            type: "input", 
            name: "departmentID",
            message: "What is your department ID?",
        
        }
      ];

      

  //start application here
      manageEmployees = () => {
        inquirer
          .prompt([
            {
              type: "list",
              message: "What would you like to do?",
              choices: [
              "Add Department", 
              "Delete Department",
              "Add Role", 
              "Delete Role",
              "Add Employee", 
              "View Employee",  
              "Delete Employee", 
              "Update Employee Role", 
              "View A Employees by Manager",
             
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
      connection.query(
        //this insert must match the create employee table in the schema
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.roleID,
          manager_id: answer.managerID
        },
      
        function(err, res) {
          console.log("does it work here?");
         
          if (err) throw err;

         //view table on terminal - use this for view role, employee, department
        connection.query(
          "SELECT * FROM employee", 
          function(err, res) {
           printTable(res)
           
            if (err) throw err;
        
         manageEmployees();
          })
        }) 
      })


      break;

      case "Add Role":
                  inquirer
                  .prompt(roleData)
                  .then((answer) => {
  //connects to mySQL database to get employee info    
      connection.query(
        //this insert must match the create employee table in the schema
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentID
        },
      
        function(err, res) {
        
         
          if (err) throw err;

         //view table on terminal - use this for view role, employee, department
        connection.query(
          "SELECT * FROM role", 
          function(err, res) {
           printTable(res)
           
            if (err) throw err;
        
         manageEmployees();
          })
        }) 
      });

      break;

      case "Add Department":
        inquirer
        .prompt({
          type: "input",
          name: "department",
          message: "What is the new department name?"
        })
        .then((answer) => {

      connection.query(
        //this insert must match the create employee table in the schema
        "INSERT INTO department SET ?",
        {
         name:answer.department
        },
      
        function(err, res) {
        
         
          if (err) throw err;

         //view table on terminal - use this for view role, employee, department
        connection.query(
          "SELECT * FROM department", 
          function(err, res) {
           printTable(res)
           
            if (err) throw err;
        
         manageEmployees();
          })
        }) 
      });

      break;

      //uses mysql database to update an employees info
        case "Update Employee Role":
          inquirer
                  .prompt([
                      {
                        type: "input",
                        message: "Which Employee would you like to update?",
                        name: "employeeID",
                      },
                      {
                        type: "input",
                        message: "What is the employee's new role?",
                        name: "changeRoleID"
                      }
                    ])
                  .then((answer) => {
             console.log(answer)
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                //where employee ID matches, set this new role
                [
                  {
                    role_id: answer.changeRoleID
                  },
                  {
                    id: answer.employeeID
                  }
                ],
              
              
          function(err, res) {
            if (err) throw err;
           
            connection.query(
              "SELECT * FROM employee", 
              function(err, res) {
               printTable(res)
               
                if (err) throw err;
            
             manageEmployees();
              })
          })
        }) 

        break;
        
        case "View Employee":
          connection.query(
            "SELECT * FROM employee", 
            function(err, res) {
             printTable(res)
             
              if (err) throw err;
          
           manageEmployees();
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
             
               
             connection.query(
                
                 "DELETE FROM employee WHERE ?",
                {
                  id: answer.employeeDel
                }
               ,
          function(err, res) {
            
            if (err) throw err;
            connection.query(
              "SELECT * FROM employee", 
              function(err, res) {
               printTable(res)
               
                if (err) throw err;
            
             manageEmployees();
              })
          })
        } 
      ) 
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
  

