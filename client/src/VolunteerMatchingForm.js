import React, { useState, useEffect } from "react";

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
    <form>
      <h2>Volunteer-Event Matching</h2>
      <div>
        <label htmlFor="volunteerSelect">Select Volunteer:</label>
        <select
          id="volunteerSelect"
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
      <div>
        <label htmlFor="eventSelect">Select Event:</label>
        <select
          id="eventSelect"
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
      <button type="button" onClick={handleMatch}>
        Match Volunteer to Event
      </button>
    </form>
  );
};

export default VolunteerMatchingForm;