const db = require("../database"); // Use require instead of import
const User = require('../models/loginUserModel'); 
// List of valid US state codes
const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  
  // Function to validate zip code format
  const isValidZipCode = (zipCode) => {
    const zipCodeRegex = /^\d{5}(-\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  };
  
  // Function to validate address format (simple regex for demonstration)
  const isValidAddress = (address) => {
    // This is a very simple regex for a US address (street name and number)
    const addressRegex = /^[0-9]+\s[A-Za-z0-9\s]+$/;
    return addressRegex.test(address);
  };
  
  // Function to validate availability (should be an array of valid dates)
  const isValidDateArray = (dates) => {
    return Array.isArray(dates) && dates.every(date => !isNaN(Date.parse(date)));
  };
  
  const createProfile = (req, res) => {
    const { fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;
  
    // Validate full name
    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ error: 'Full name must be at least 2 characters long.' });
    }
  
    // Validate address
    if (!isValidAddress(address1)) {
      return res.status(400).json({ error: 'Address 1 is not a valid US address format.' });
    }
  
    // City cannot be empty
    if (!city || city.length === 0) {
      return res.status(400).json({ error: 'City is required.' });
    }
  
    // Validate state
    if (!validStates.includes(state)) {
      return res.status(400).json({ error: 'Invalid US state code.' });
    }
  
    // Validate zip code
    if (!isValidZipCode(zipCode)) {
      return res.status(400).json({ error: 'Invalid zip code format. Must be 5 or 9 digits.' });
    }
  
    // Validate skills (ensure it's an array and contains at least one skill)
    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: 'At least one skill must be selected.' });
    }
  
    // Validate availability (ensure it's an array of valid dates)
    if (!isValidDateArray(availability)) {
      return res.status(400).json({ error: 'Availability must be an array of valid dates.' });
    }

  // Insert into UserProfile table
  try {
    
    console.log('Profile Data Received:', req.body);

    const query = `
      INSERT INTO UserProfile (user_id, full_name, address,address2, city, state, zipcode, skills, preferences, availability)
      VALUES (?)
    `;
    
    const availability_ = JSON.stringify(req.body.availability);  // Convert array to JSON string
    const skills_ = JSON.stringify(req.body.skills);  // Convert array to JSON string
    //console.log("checking if we have the ID correct:",req.body.userID );

    const values = [
      req.body.user_id,
      req.body.fullName,
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zipCode,
      skills_,
      req.body.preferences,
      availability_
    ]

    db.query(query, [values], (err, data) => { //send the data to the DB
      // if (err) {
      //   console.error("Error saving profile:", err.message); // Log the error
      //   return res.status(500).json({ error: "Failed to save profile to the database." });
      // }
      // console.log("Profile saved successfully:", data);
      // res.status(201).json({ message: "Profile saved successfully", data });
    });
    console.log("Profile saved successfully");
    User.setProfileComplete(req.body.user_id);//set profile complete
    res.status(201).json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error('Error saving profile:', err);
    res.status(500).json({ error: 'An error occurred while saving the profile.' });
  }
  };
  
  const getProfile = async (req, res) => {
    // return the profile data here from the database
    const query = `SELECT id, full_name FROM UserProfile`;
    try {
      const [rows] = await db.query(query);
      console.log({rows});
      res.status(200).json({rows}); // Return the query results
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; // Let the caller handle the error
    }
    //res.status(200).json({ message: 'Profile GET request successful' });
  };
  
  module.exports = {
    getProfile,
    createProfile,
  };
  