// VolunteerMatchingRoutes.js

// routes/VolunteerMatchingRoutes.js
const express = require('express');
const { matchVolunteers } = require('../controllers/VolunteerMatchingController');
const router = express.Router();

// Routes
router.post('/match', matchVolunteers);

module.exports = router;