const { NotificationSystem, MockNotificationService } = require('../services/notificationService');

// Create an instance of the notification service (you can replace it with a real service)
const notificationService = new MockNotificationService();
const notificationSystem = new NotificationSystem(notificationService);

// Send assignment notification
exports.sendAssignmentNotification = (req, res) => {
    const { volunteer, event } = req.body;

    if (!volunteer || !event) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    notificationSystem.sendAssignmentNotification(volunteer, event);
    return res.status(200).json({ message: 'Assignment notification sent' });
};

// Send update notification
exports.sendUpdateNotification = (req, res) => {
    const { volunteer, event, updates } = req.body;

    if (!volunteer || !event || !updates) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    notificationSystem.sendUpdateNotification(volunteer, event, updates);
    return res.status(200).json({ message: 'Update notification sent' });
};

// Send reminder notification
exports.sendReminderNotification = (req, res) => {
    const { volunteer, event } = req.body;

    if (!volunteer || !event) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    notificationSystem.sendReminderNotification(volunteer, event);
    return res.status(200).json({ message: 'Reminder notification sent' });
};
