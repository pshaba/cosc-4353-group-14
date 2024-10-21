CREATE DATABASE IF NOT EXISTS volunteerDatabase; /*create new database*/

USE volunteerDatabase; 

--------------------------------------------
--         Table 'userCredentials'
--------------------------------------------
CREATE TABLE userCredentials (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    profileComplete BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 
