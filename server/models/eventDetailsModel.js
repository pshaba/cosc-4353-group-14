const pool = require('../database');

// Create a new event
exports.createEvent = (eventDetails, callback) => {
    const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = eventDetails;
    console.log({eventDetails});
    console.log({eventName, eventDescription, location, requiredSkills, urgency, eventDate});
    const skills_ = JSON.stringify(requiredSkills);// Convert array to JSON string
    const query = `
        INSERT INTO EventDetails (event_name, description, location, required_skills, urgency, event_date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    pool.query(query, [eventName, eventDescription, location, skills_, urgency, eventDate], callback);
};

// Get all events
exports.getEvents = async (req, res) => {
    const query = `SELECT event_name, event_id FROM EventDetails`;
    try {
        const [rows] = await pool.query(query);
        console.log({ rows });
        res.status(200).json({rows}); // Make sure to wrap the response in an object with a key, like 'events'
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; // Respond with an error message if something goes wrong
    }
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
