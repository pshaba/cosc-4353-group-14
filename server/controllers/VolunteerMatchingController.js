const VolunteerMatcher = require('../services/volunteerMatcher');

// Match volunteers for an event
exports.matchVolunteers = (req, res) => {
    const { volunteers, events } = req.body;

    if (!volunteers || volunteers.length === 0 || !events || events.length === 0) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    const matcher = new VolunteerMatcher(volunteers, events);
    const matches = matcher.matchVolunteers();
    return res.status(200).json({ matches });
};
