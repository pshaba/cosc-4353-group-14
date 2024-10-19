// VolunteerMatchingController.js

exports.matchVolunteers = (req, res) => {
    const { volunteers, event } = req.body;
    if (!volunteers || !event) {
        return res.status(500).json({ message: 'Failed to match volunteers' });
    }
    return res.status(200).json({ matches: [{ volunteer: volunteers[0], event }] });
};
