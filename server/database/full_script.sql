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

-- Set AUTO_INCREMENT starting value
ALTER TABLE userCredentials AUTO_INCREMENT = 3001;

--------------------------------------------
--         Table 'UserProfile'
--------------------------------------------

CREATE TABLE UserProfile (
    id INT PRIMARY KEY AUTO_INCREMENT,       -- Unique identifier for each user
    user_id INT NOT NULL,                    -- User ID (foreign key to UserProfile table)
    full_name VARCHAR(255) NOT NULL,         -- Full name of the user
    address VARCHAR(255),                    -- Street address of the user
	address2 VARCHAR(255), 					 -- address 2
    city VARCHAR(100),                       -- City of the user
    state VARCHAR(2),                        -- State code (e.g., 'TX' for Texas)
    zipcode VARCHAR(10),                     -- Zip code of the user (handle international zip codes)
    skills TEXT,                             -- Skills of the user (as a comma-separated list or JSON)
    preferences TEXT,                        -- User preferences (as a comma-separated list or JSON)
    availability JSON,                       -- Availability (can store days and hours in JSON format)
    FOREIGN KEY (user_id) REFERENCES usercredentials(id) ON DELETE CASCADE,   -- Foreign key with delete cascade
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
  
);

--------------------------------------------
--         Table 'EventDetails'
--------------------------------------------

CREATE TABLE EventDetails (
    event_id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each event
    event_name VARCHAR(255) NOT NULL,        -- Name of the event
    description TEXT,                        -- Description of the event
    location VARCHAR(255),                   -- Location of the event
    required_skills TEXT,                    -- Required skills (as a comma-separated list or JSON)
    urgency VARCHAR(50),                     -- Urgency level (e.g., 'High', 'Medium', 'Low')
    event_date DATE,                         -- Date of the event
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);

--------------------------------------------
--         Table 'VolunteerParticipation'
--------------------------------------------

CREATE TABLE VolunteerParticipation (
    participation_id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique identifier for each participation record
    user_id INT NOT NULL,                                   -- User ID (foreign key to UserProfile table)
    event_id INT NOT NULL,                                  -- Event ID (foreign key to EventDetails table)
    participation_date DATE NOT NULL,                       -- Date of the volunteer's participation
    hours_volunteered DECIMAL(5, 2) NOT NULL,               -- Number of hours volunteered
    role VARCHAR(255) NOT NULL,                             -- Role or task assigned during the event
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record update timestamp
    FOREIGN KEY (user_id) REFERENCES UserProfile(user_id) ON DELETE CASCADE,   -- Foreign key with delete cascade
    FOREIGN KEY (event_id) REFERENCES EventDetails(event_id) ON DELETE CASCADE -- Foreign key with delete cascade
);



--------------------------------------------
--         DATAAAAAAAA'
--------------------------------------------


-- Insert 16 new records into userCredentials
INSERT INTO userCredentials (email, password, profileComplete)
VALUES
('carla.moore@example.com', 'carlaPass123', TRUE),
('mark.jones@example.com', 'markSecure456', FALSE),
('lisa.rogers@example.com', 'lisaPassword789', TRUE),
('michael.baker@example.com', 'michaelPass123', TRUE),
('nina.harris@example.com', 'ninaSecure456', FALSE),
('samuel.clark@example.com', 'samuelPass789', TRUE),
('olivia.king@example.com', 'oliviaSecure123', TRUE),
('paul.scott@example.com', 'paulPassword456', TRUE),
('emily.adams@example.com', 'emilyPass123', FALSE),
('daniel.green@example.com', 'danielSecure789', TRUE),
('sophia.wright@example.com', 'sophiaPass456', TRUE),
('james.turner@example.com', 'jamesSecure123', FALSE),
('mia.walker@example.com', 'miaPassword789', TRUE),
('jack.lee@example.com', 'jackPass456', TRUE),
('chloe.taylor@example.com', 'chloeSecure123', TRUE),
('ryan.evans@example.com', 'ryanPassword456', TRUE);


-- Insert 16 new records into UserProfile
INSERT INTO UserProfile (user_id, full_name, address, address2, city, state, zipcode, skills, preferences, availability)
VALUES
(3005, 'Carla Moore', '123 Garden St', '', 'Houston', 'TX', '77002', 'Event Planning,Organizing', 'Morning shifts', '{"days":["Monday","Thursday"],"hours":"9:00-12:00"}'),
(3006, 'Mark Jones', '456 Forest Ave', '', 'Austin', 'TX', '73301', 'Teamwork,Leadership', 'Evening shifts', '{"days":["Tuesday","Friday"],"hours":"18:00-21:00"}'),
(3007, 'Lisa Rogers', '789 River Rd', 'Apt 2', 'Dallas', 'TX', '75202', 'Graphic Design,Photography', 'Flexible hours', '{"days":["Wednesday","Saturday"],"hours":"14:00-18:00"}'),
(3008, 'Michael Baker', '321 Hill St', '', 'San Antonio', 'TX', '78202', 'Public Speaking,IT Support', 'Weekends only', '{"days":["Saturday","Sunday"],"hours":"10:00-16:00"}'),
(3009, 'Nina Harris', '654 Lake St', '', 'El Paso', 'TX', '79902', 'Teaching,First Aid', 'Morning shifts', '{"days":["Monday","Wednesday"],"hours":"8:00-11:00"}'),
(3010, 'Samuel Clark', '987 Meadow Ln', '', 'Fort Worth', 'TX', '76102', 'Marketing,Accounting', 'Evening shifts', '{"days":["Tuesday","Thursday"],"hours":"17:00-20:00"}'),
(3011, 'Olivia King', '213 Valley Rd', 'Building C', 'Corpus Christi', 'TX', '78402', 'Logistics,Leadership', 'Weekends only', '{"days":["Saturday","Sunday"],"hours":"9:00-13:00"}'),
(3012, 'Paul Scott', '876 Sunset Blvd', '', 'Plano', 'TX', '75024', 'Coding,Web Development', 'Flexible hours', '{"days":["Wednesday","Friday"],"hours":"15:00-19:00"}'),
(3013, 'Emily Adams', '432 Spring St', '', 'Lubbock', 'TX', '79402', 'Customer Service,Communication', 'Morning shifts', '{"days":["Tuesday","Thursday"],"hours":"8:00-12:00"}'),
(3014, 'Daniel Green', '765 Summer Ln', '', 'Amarillo', 'TX', '79102', 'Event Coordination,Logistics', 'Evening shifts', '{"days":["Wednesday","Saturday"],"hours":"18:00-22:00"}'),
(3015, 'Sophia Wright', '123 Birch St', '', 'Irving', 'TX', '75039', 'Problem Solving,Management', 'Morning shifts', '{"days":["Monday","Friday"],"hours":"9:00-11:00"}'),
(3016, 'James Turner', '456 Aspen Ave', '', 'Garland', 'TX', '75042', 'Event Planning,Volunteer Coordination', 'Flexible hours', '{"days":["Thursday","Saturday"],"hours":"10:00-14:00"}'),
(3017, 'Mia Walker', '789 Maple Dr', '', 'Frisco', 'TX', '75035', 'Photography,Social Media', 'Evening shifts', '{"days":["Tuesday","Sunday"],"hours":"16:00-20:00"}'),
(3018, 'Jack Lee', '321 Pine Ln', '', 'McKinney', 'TX', '75069', 'First Aid,Logistics', 'Weekends only', '{"days":["Saturday","Sunday"],"hours":"9:00-15:00"}'),
(3019, 'Chloe Taylor', '654 Oak St', '', 'Tyler', 'TX', '75701', 'Public Speaking,Leadership', 'Morning shifts', '{"days":["Monday","Thursday"],"hours":"8:00-11:00"}'),
(3020, 'Ryan Evans', '987 Elm St', '', 'Beaumont', 'TX', '77701', 'Coding,Teaching', 'Flexible hours', '{"days":["Tuesday","Friday"],"hours":"12:00-17:00"}');

INSERT INTO EventDetails (event_id, event_name, event_date, location)
VALUES
(101, 'Community Clean-up', '2024-11-01', 'Park A'),
(102, 'Food Drive', '2024-11-02', 'Community Center'),
(103, 'Charity Run', '2024-11-03', 'City Square'),
(104, 'Blood Donation Camp', '2024-11-04', 'Hospital B'),
(105, 'Tech Workshop', '2024-11-05', 'Tech Hub'),
(106, 'Art Festival', '2024-11-06', 'Gallery C'),
(107, 'Media Awareness', '2024-11-07', 'Hall D'),
(108, 'Logistics Training', '2024-11-08', 'Warehouse X'),
(109, 'Clean-up Drive', '2024-11-09', 'Beach Z'),
(110, 'Public Speaking', '2024-11-10', 'Auditorium Y'),
(111, 'Music Festival', '2024-11-11', 'Arena Q'),
(112, 'Volunteers Meet-up', '2024-11-12', 'Hotel W'),
(113, 'Charity Auction', '2024-11-13', 'Event Hall P'),
(114, 'Medical Camp', '2024-11-14', 'Clinic K'),
(115, 'Stage Performance', '2024-11-15', 'Theater M'),
(116, 'Media Workshop', '2024-11-16', 'Studio N'),
(117, 'First Aid Training', '2024-11-17', 'Clinic R'),
(118, 'Speaker Series', '2024-11-18', 'Conference Room L'),
(119, 'Logistics Day', '2024-11-19', 'Warehouse T'),
(120, 'Cultural Fest', '2024-11-20', 'University H');


INSERT INTO VolunteerParticipation (user_id, event_id, participation_date, hours_volunteered, role)
VALUES 
(3001, 101, '2024-11-01', 4.5, 'Registration Coordinator'),
(3002, 102, '2024-11-02', 3.0, 'Food Distribution Volunteer'),
(3003, 103, '2024-11-03', 5.0, 'Event Setup Team'),
(3004, 104, '2024-11-04', 2.0, 'Crowd Management'),
(3005, 105, '2024-11-05', 6.0, 'Tech Support'),
(3006, 106, '2024-11-06', 4.0, 'Workshop Coordinator'),
(3007, 107, '2024-11-07', 7.5, 'Media Coverage'),
(3008, 108, '2024-11-08', 3.5, 'Logistics Support'),
(3009, 109, '2024-11-09', 2.5, 'Event Cleanup'),
(3010, 110, '2024-11-10', 8.0, 'Speaker Assistance'),
(3011, 111, '2024-11-11', 4.5, 'Event Host'),
(3012, 112, '2024-11-12', 3.0, 'Volunteer Coordination'),
(3013, 113, '2024-11-13', 5.0, 'Registration Coordinator'),
(3014, 114, '2024-11-14', 6.5, 'Medical Aid Volunteer'),
(3015, 115, '2024-11-15', 2.0, 'Stage Management'),
(3016, 116, '2024-11-16', 3.0, 'Media Support'),
(3017, 117, '2024-11-17', 4.0, 'First Aid Volunteer'),
(3018, 118, '2024-11-18', 7.5, 'Speaker Assistance'),
(3019, 119, '2024-11-19', 3.5, 'Logistics Support'),
(3020, 120, '2024-11-20', 5.5, 'Event Host');
