// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link className="nav-link" to="/login">Login</Link></li>
          <li><Link className="nav-link" to="/register">Register</Link></li>
          <li><Link className="nav-link" to="/profile">Profile</Link></li>
          <li><Link className="nav-link" to="/event-management">Event Management</Link></li>
          <li><Link className="nav-link" to="/volunteer-matching">Volunteer Matching</Link></li>
          <li><Link className="nav-link" to="/notifications">Notifications</Link></li>
          <li><Link className="nav-link" to="/volunteer-history">Volunteer History</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
