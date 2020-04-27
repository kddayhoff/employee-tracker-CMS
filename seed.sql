DROP DATABASE IF EXISTS employee_cmsDB

CREATE DATABASE employee_cmsDB

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    PRIMARY KEY (id),
    role_id INT FOREIGN KEY REFERENCES role (title)
    (manager_id) INT FOREIGN KEY REFERENCES role (title)
--    need to figure out how to assign a manager or null
)
PersonID int FOREIGN KEY REFERENCES Persons(PersonID)
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(6, 0),
    PRIMARY KEY (id),
    (department_id) INT FOREIGN KEY REFERENCES department (id)
)

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Itylah", "Tenefer", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marflutter", "Fanghoward", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mashrson", "Watsonbow", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Toralk", "Abalham", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andregat", "Hammashmed", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alexanaphim", "Sanphas", "", "");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lophasia", "Cagstillo", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clala", "Schrharris", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Itylah", "Tenefer", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marshareeka", "Nuachavez", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Loperita", "Scori", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ellisette", "Dracowen", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Palla", "Warswoon", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Perookie", "Mcdontroll", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Siflutter", "Gonzalight", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hellins", "Perookie", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Russetho", "Surllins", "", "");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stepogo", "Azallen", "", "");



ride operators
game attendant
ride engineer
actors
security
ticket takers
owner 
manager