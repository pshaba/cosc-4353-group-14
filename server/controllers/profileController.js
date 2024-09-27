

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
  
    // If all validations pass, simulate saving the profile
    console.log('Profile Data Received:', req.body);
    
    // Send success message
  //  return res.json({ message: 'Profile saved successfully!' });
    // res.json({ message: 'Profile Saved successfully!' });
    res.send('Profile Saved and Hello from Server ')
  };
  
  const getProfile = (req, res) => {
    // You would return the profile data here from your database
    res.status(200).json({ message: 'Profile GET request successful' });
  };
  
  module.exports = {
    getProfile,
    createProfile,
  };
  