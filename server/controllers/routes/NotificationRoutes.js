// routes/NotificationRoutes.js
const express = require('express');
const {
    sendAssignmentNotification,
    sendUpdateNotification,
    sendReminderNotification
} = require('../controllers/NotificationController');  // This should be correct

const router = express.Router();

// Define routes for sending notifications
router.post('/sendAssignment', sendAssignmentNotification);
router.post('/sendUpdate', sendUpdateNotification);
router.post('/sendReminder', sendReminderNotification);

module.exports = router;
