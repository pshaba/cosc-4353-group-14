// src/components/Profile.js
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState('');
  const [availability, setAvailability] = useState(null);

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


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile submission logic
    console.log({ fullName, address1, address2, city, state, zipCode, skills, preferences, availability });
  };

  return (
    <div className="container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          maxLength={50}
          required
        />

        <label>Address 1:</label>
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          maxLength={100}
          required
        />

        <label>Address 2:</label>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          maxLength={100}
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          maxLength={100}
          required
        />

        <label>State:</label>
        <Select
          options={stateOptions}
          onChange={(selectedOption) => setState(selectedOption.value)}
          required
        />

        <label>Zip Code:</label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          maxLength={9}
          minLength={5}
          required
        />

        <label>Skills:</label>
        <Select
          options={skillOptions}
          isMulti
          onChange={(selectedOptions) => setSkills(selectedOptions.map(option => option.value))}
          required
        />

        <label>Preferences:</label>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />

        <label>Availability:</label>
        <DatePicker
          selected={availability}
          onChange={(date) => setAvailability(date)}
          required
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
