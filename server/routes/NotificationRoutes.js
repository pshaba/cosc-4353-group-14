const express = require('express');
const {
    sendAssignmentNotification,
    sendUpdateNotification,
    sendReminderNotification
} = require('../controllers/NotificationController');

const router = express.Router();

// Define routes
router.post('/sendAssignment', sendAssignmentNotification);
router.post('/sendUpdate', sendUpdateNotification);
router.post('/sendReminder', sendReminderNotification);

module.exports = router;
