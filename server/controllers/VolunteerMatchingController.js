// controllers/VolunteerMatchingController.js

const VolunteerMatcher = require('../services/volunteerMatcher');

// Match volunteers for an event
exports.matchVolunteers = (req, res) => {
    const { volunteers, events } = req.body;
    const matcher = new VolunteerMatcher(volunteers, events);
    const matches = matcher.matchVolunteers();
    res.status(200).json({ matches });
};
