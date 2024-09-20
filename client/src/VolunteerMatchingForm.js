import React, { useState, useEffect } from "react";
import "./VolunteerMatchingForm.css" // Custom CSS

const VolunteerMatchingForm = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    // Fetch the list of volunteers and events from the server
    fetch("/api/volunteers")
      .then((response) => response.json())
      .then((volunteerData) => setVolunteers(volunteerData));

    fetch("/api/events")
      .then((response) => response.json())
      .then((eventData) => setEvents(eventData));
  }, []);

  const handleMatch = () => {
    // Logic to handle volunteer-event matching, e.g., sending to server
    alert(`Successfully matched ${selectedVolunteer} to ${selectedEvent}`);
  };

  return (
    <div className="container mt-5">
      <h2>Volunteer-Event Matching</h2>
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="volunteerSelect">Select Volunteer:</label>
          <select
            id="volunteerSelect custom-select"
            className="form-select"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
          >
            <option value="">Choose a volunteer</option>
            {volunteers.map((volunteer) => (
              <option key={volunteer.id} value={volunteer.name}>
                {volunteer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="eventSelect">Select Event:</label>
          <select
            id="eventSelect custom-select"
            className="form-select"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Choose an event</option>
            {events.map((event) => (
              <option key={event.id} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" id="submit_btn" type="button" onClick={handleMatch}>Select Volunteer</button>
      </form>
    </div>
  );
};

export default VolunteerMatchingForm;