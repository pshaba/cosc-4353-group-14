// services/notificationService.js
class NotificationSystem {
    constructor(service) {
        this.service = service;
    }

    sendAssignmentNotification(volunteer, event) {
        return this.service.send(`Assigned ${volunteer.name} to ${event.name}`);
    }

    sendUpdateNotification(volunteer, event, updates) {
        return this.service.send(`Update for ${volunteer.name} on ${event.name}: ${JSON.stringify(updates)}`);
    }

    sendReminderNotification(volunteer, event) {
        return this.service.send(`Reminder: ${volunteer.name}, don't forget ${event.name}`);
    }
}

class MockNotificationService {
    send(message) {
        console.log(`Mock notification sent: ${message}`);
        return true;
    }
}

module.exports = { NotificationSystem, MockNotificationService };
