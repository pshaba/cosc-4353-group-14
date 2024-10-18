const express = require('express');
const { matchVolunteers } = require('../controllers/VolunteerMatchingController');

const router = express.Router();

// Define the route
router.post('/matchVolunteers', matchVolunteers);

module.exports = router;
