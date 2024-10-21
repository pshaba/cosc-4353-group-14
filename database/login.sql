/* database/login.sql */

CREATE DATABASE loginDatabase; /*create new database*/

USE loginDatabase; /*use loginDatabase for subsequent operations*/

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    profileComplete BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 