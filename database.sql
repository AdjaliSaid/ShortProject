DROP DATABASE IF EXISTS PatientsDB;
CREATE DATABASE PatientsDB;
USE PatientsDB;

CREATE TABLE users (
    id INT(15) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(100) Not NULL
);


CREATE TABLE patients (
    id INT(15) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(30),
    userId int,
    FOREIGN KEY(userId) REFERENCES users(id)
);