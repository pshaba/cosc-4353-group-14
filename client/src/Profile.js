// src/components/Profile.js
import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom'; //for redirection to Home page
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Profile.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap CSS

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState('');
  //const [availability, setAvailability] = useState(null);
  const [availability, setAvailability] = useState([]); // Update: Array for multiple dates
  const navigate = useNavigate(); //for redirection to home page after profile is submitted

  const skillOptions = [
    { value: 'leadership', label: 'Leadership' },
    { value: 'organization', label: 'Organization' },
    { value: 'technical', label: 'Technical' },
    // Add more skills
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
];

  // Function to handle adding/removing multiple dates
  const handleDateChange = (date) => {
    // Check if the date is already selected
    if (availability.find((d) => d.getTime() === date.getTime())) {
      // If already selected, remove the date
      setAvailability(availability.filter((d) => d.getTime() !== date.getTime()));
    } else {
      // Otherwise, add the date to availability
      setAvailability([...availability, date]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile submission logic
    console.log({ fullName, address1, address2, city, state, zipCode, skills, preferences, availability });
    
    //after submitting profile, navigate to Home
    navigate('/Home'); 
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body"> 
              <h2 className="card-title text-center">Profile</h2>
              <form onSubmit={handleSubmit} className="py-4 px-3">
                <div className="mb-3">
                  <label className="form-label">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address 1:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address 2:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">State:</label>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={stateOptions}
                    onChange={(selectedOption) => setState(selectedOption.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Zip Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    maxLength={9}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Skills:</label>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={skillOptions}
                    isMulti
                    onChange={(selectedOptions) => setSkills(selectedOptions.map(option => option.value))}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Preferences:</label>
                  <textarea
                    className="form-control"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Availability: </label>
                  <DatePicker
                    className="form-control"
                    selected={null} // Disable single date selection
                    onChange={handleDateChange} // Update availability on change
                    highlightDates={availability} // Highlight the selected dates in the picker
                    placeholderText="Click to select dates"
                    
                  />
                </div>
                {/* Display the selected dates */}
                <div className="selected-dates">
                  {availability.length > 0 ? (
                    <p>Selected Dates: {availability.map(date => date.toLocaleDateString()).join(', ')}</p>
                  ) : (
                    <p>No dates selected</p>
                  )}
                </div>
                <button className="btn btn-primary" id="profile_btn" type="submit">Save Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
