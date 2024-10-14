// routes/volunteerMatchingRoutes.js

const express = require('express');
const { matchVolunteers } = require('../controllers/VolunteerMatchingController');

const router = express.Router();

// Define the route for matching volunteers to events
router.post('/matchVolunteers', matchVolunteers);

module.exports = router;
