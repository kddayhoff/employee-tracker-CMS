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


INSERT INTO employee (first_name, last_name)
VALUES ("Itylah", "Tenefer");

INSERT INTO department (dept_name)
value("Owner");

INSERT INTO employee (first_name, last_name)
VALUES ("Marflutter", "Fanghoward");


INSERT INTO employee (first_name, last_name)
VALUES ("Mashrson", "Watsonbow");


INSERT INTO employee (first_name, last_name)
VALUES ("Toralk", "Abalham");


INSERT INTO employee (first_name, last_name)
VALUES ("Andregat", "Hammashmed");


INSERT INTO employee (first_name, last_name)
VALUES ("Alexanaphim", "Sanphas");

INSERT INTO employee (first_name, last_name)
VALUES ("Lophasia", "Cagstillo");


INSERT INTO employee (first_name, last_name)
VALUES ("Clala", "Schrharris");



INSERT INTO employee (first_name, last_name)
VALUES ("Marshareeka", "Nuachavez");


INSERT INTO employee (first_name, last_name)
VALUES ("Loperita", "Scori");


INSERT INTO employee (first_name, last_name)
VALUES ("Ellisette", "Dracowen");


INSERT INTO employee (first_name, last_name)
VALUES ("Palla", "Warswoon");


INSERT INTO employee (first_name, last_name)
VALUES ("Perookie", "Mcdontroll");


INSERT INTO employee (first_name, last_name)
VALUES ("Siflutter", "Gonzalight");


INSERT INTO employee (first_name, last_name)
VALUES ("Hellins", "Perookie");


INSERT INTO employee (first_name, last_name)
VALUES ("Russetho", "Surllins");


INSERT INTO employee (first_name, last_name)
VALUES ("Stepogo", "Azallen");

ride operators
game attendant
ride engineer
actors
security
ticket takers
owner 
manager