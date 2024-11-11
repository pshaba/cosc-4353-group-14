const express = require('express');
const { generateVolunteerReportCSV, generateVolunteerReportPDF, generateEventReportCSV, generateEventReportPDF } = require('../controllers/reportController');
const router = express.Router();

// Routes for generating volunteer participation reports
router.post('/generate-volunteer-csv', generateVolunteerReportCSV);
router.post('/generate-volunteer-pdf', generateVolunteerReportPDF);

// Routes for generating event reports
router.post('/generate-event-csv', generateEventReportCSV);
router.post('/generate-event-pdf', generateEventReportPDF);

module.exports = router;
