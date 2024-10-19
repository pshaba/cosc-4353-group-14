//NotificationController.js

exports.sendAssignmentNotification = (req, res) => {
    const { volunteer, event } = req.body;
    if (!volunteer || !event) {
        return res.status(500).json({ message: 'Failed to send notification' });
    }
    return res.status(200).json({ message: `Assignment notification sent to ${volunteer} for ${event}` });
};

exports.sendUpdateNotification = (req, res) => {
    const { volunteer, event } = req.body;
    return res.status(200).json({ message: 'Update notification sent' });
};

exports.sendReminderNotification = (req, res) => {
    const { volunteer, event } = req.body;
    return res.status(200).json({ message: 'Reminder notification sent' });
};
