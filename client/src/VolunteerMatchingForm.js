import React, { useState, useEffect } from "react";
import "./VolunteerMatchingForm.css"; // Custom CSS

const VolunteerMatchingForm = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    // Fetch the list of volunteers and events from the server
    fetch("/profile")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch volunteers");
        }
        return response.json();
      })
      .then((volunteerData) => {
        console.log('Volunteer data:', volunteerData); // Log the fetched data
        setVolunteers(volunteerData.rows); // Set the volunteers array
      })
      .catch((error) => console.error("Error fetching volunteers:", error));

    fetch("/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((eventData) => {
        console.log('Fetched events:', eventData); // Log the event data to ensure it is correct
        setEvents(eventData.rows); // Fix the property to 'rows', based on your previous response
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleMatch = () => {
    // Logic to handle volunteer-event matching, e.g., sending to server
    if (!selectedVolunteer || !selectedEvent) {
      alert("Please select both a volunteer and an event.");
      return;
    }
    alert(`Successfully matched ${selectedVolunteer} to ${selectedEvent}`);
  };

  return (
    <div className="container mt-5">
      <h2>Volunteer-Event Matching</h2>
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="volunteerSelect">
            Select Volunteer:
          </label>
          <select
            id="volunteerSelect"
            className="form-select"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
          >
            <option value="">Choose a volunteer</option>
            {volunteers.length > 0 ? (
              volunteers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.full_name} style={{ color: "black" }}>
                  {volunteer.full_name} {/* Ensure the correct field is used */}
                </option>
              ))
            ) : (
              <option disabled>No volunteers available</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="eventSelect">
            Select Event:
          </label>
          <select
            id="eventSelect"
            className="form-select"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Choose an event</option>
            {events.length > 0 ? (
              events.map((event) => (
                <option key={event.event_id} value={event.event_name}>
                  {event.event_name}
                </option>
              ))
            ) : (
              <option disabled>No events available</option>
            )}
          </select>
        </div>

        <button
          className="btn btn-primary"
          id="submit_btn"
          type="button"
          onClick={handleMatch}
        >
          Match Volunteer
        </button>
      </form>
    </div>
  );
};

export default VolunteerMatchingForm;
