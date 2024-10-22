CREATE DATABASE IF NOT EXISTS volunteerDatabase; /*create new database*/

USE volunteerDatabase; 

--------------------------------------------
--         Table 'userCredentials'
--------------------------------------------
CREATE TABLE userCredentials (
    user_id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    profileComplete BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 

--------------------------------------------
--         Table 'UserProfile'
--------------------------------------------

CREATE TABLE UserProfile (
    user_id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique identifier for each user
    full_name VARCHAR(255) NOT NULL,         -- Full name of the user
    address VARCHAR(255),                    -- Street address of the user
	address2 VARCHAR(255), 					 -- address 2
    city VARCHAR(100),                       -- City of the user
    state VARCHAR(2),                        -- State code (e.g., 'TX' for Texas)
    zipcode VARCHAR(10),                     -- Zip code of the user (handle international zip codes)
    skills TEXT,                             -- Skills of the user (as a comma-separated list or JSON)
    preferences TEXT,                        -- User preferences (as a comma-separated list or JSON)
    availability JSON,                       -- Availability (can store days and hours in JSON format)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);
