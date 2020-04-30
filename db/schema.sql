DROP DATABASE IF EXISTS employee_cmsDB;

CREATE DATABASE employee_cmsDB;

USE employee_cmsDB;

CREATE TABLE employee (
    employee_id INT(50) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES role (role_id)
);


CREATE TABLE role (
    role_id INT(50) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(6, 0),
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department (department_id)
    
);

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (department_id)
);