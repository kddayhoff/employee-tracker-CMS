DROP DATABASE IF EXISTS employee_cmsDB;

CREATE DATABASE employee_cmsDB;

USE employee_cmsDB;


CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

-- foreign key associates with the other table that it might need to reference
CREATE TABLE role (
   id INT(50) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title NOT NULL VARCHAR(30),
    salary NOT NULL DECIMAL,
    department_id NOT NULL INT,
    
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE

);

CREATE TABLE employee (
    id INT(50) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name NOT NULL VARCHAR(30),
    last_name NOT NULL VARCHAR(30),
    role_id NOT NULL INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);