const pool = require('../database');

// Create a new event
exports.createEvent = (eventDetails, callback) => {
    const { event_name, description, location, required_skills, urgency, event_date } = eventDetails;
    const query = `
        INSERT INTO EventDetails (event_name, description, location, required_skills, urgency, event_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    pool.query(query, [event_name, description, location, required_skills, urgency, event_date], callback);
};

// Get all events
exports.getEvents = (callback) => {
    const query = `SELECT * FROM EventDetails`;
    pool.query(query, callback);
};

// Update an event by ID
exports.updateEvent = (id, eventDetails, callback) => {
    const { event_name, description, location, required_skills, urgency, event_date } = eventDetails;
    const query = `
        UPDATE EventDetails
        SET event_name = ?, description = ?, location = ?, required_skills = ?, urgency = ?, event_date = ?
        WHERE id = ?
    `;
    pool.query(query, [event_name, description, location, required_skills, urgency, event_date, id], callback);
};

// Delete an event by ID
exports.deleteEvent = (id, callback) => {
    const query = `DELETE FROM EventDetails WHERE id = ?`;
    pool.query(query, [id], callback);
};
