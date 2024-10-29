const eventModel = require('../models/eventDetailsModel');

// Create a new event
exports.createEvent = (req, res) => {
    eventModel.createEvent(req.body, (error, results) => {
        if (error) {
            console.error('Error inserting event:', error);
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        res.status(201).json({ message: 'Event created successfully', eventId: results.insertId });
    });
};

// Get all events
exports.getEvents = (req, res) => {
    eventModel.getEvents((error, results) => {
        if (error) {
            console.error('Error fetching events:', error);
            return res.status(500).json({ error: 'Failed to retrieve events' });
        }
        res.status(200).json(results);
    });
};

// Update an event
exports.updateEvent = (req, res) => {
    const { id } = req.params;

    eventModel.updateEvent(id, req.body, (error, results) => {
        if (error) {
            console.error('Error updating event:', error);
            return res.status(500).json({ error: 'Failed to update event' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully' });
    });
};

// Delete an event
exports.deleteEvent = (req, res) => {
    const { id } = req.params;

    eventModel.deleteEvent(id, (error, results) => {
        if (error) {
            console.error('Error deleting event:', error);
            return res.status(500).json({ error: 'Failed to delete event' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    });
};
