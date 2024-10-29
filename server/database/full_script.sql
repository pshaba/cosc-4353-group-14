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

--------------------------------------------
--         Table 'EventDetails'
--------------------------------------------

CREATE TABLE EventDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each event
    event_name VARCHAR(255) NOT NULL,        -- Name of the event
    description TEXT,                        -- Description of the event
    location VARCHAR(255),                   -- Location of the event
    required_skills TEXT,                    -- Required skills (as a comma-separated list or JSON)
    urgency VARCHAR(50),                     -- Urgency level (e.g., 'High', 'Medium', 'Low')
    event_date DATE,                         -- Date of the event
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);