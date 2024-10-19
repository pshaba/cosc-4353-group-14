// NotificationRoutes.js

const express = require('express');
const router = express.Router();
const {
    sendAssignmentNotification,
    sendUpdateNotification,
    sendReminderNotification
} = require('../controllers/NotificationController');

// Define the POST routes for notifications
router.post('/sendAssignment', sendAssignmentNotification);
router.post('/sendUpdate', sendUpdateNotification);
router.post('/sendReminder', sendReminderNotification);

module.exports = router;