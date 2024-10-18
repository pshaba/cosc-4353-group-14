// server/services/notificationService.js

class MockNotificationService {
    sendAssignmentNotification(volunteer, event) {
        console.log(`Sending assignment notification to ${volunteer.name} for event ${event.name}`);
    }

    sendUpdateNotification(volunteer, event, updates) {
        console.log(`Sending update notification to ${volunteer.name} for event ${event.name}: ${JSON.stringify(updates)}`);
    }

    sendReminderNotification(volunteer, event) {
        console.log(`Sending reminder notification to ${volunteer.name} for event ${event.name}`);
    }
}

class NotificationSystem {
    constructor(service) {
        this.service = service;
    }

    sendAssignmentNotification(volunteer, event) {
        this.service.sendAssignmentNotification(volunteer, event);
    }

    sendUpdateNotification(volunteer, event, updates) {
        this.service.sendUpdateNotification(volunteer, event, updates);
    }

    sendReminderNotification(volunteer, event) {
        this.service.sendReminderNotification(volunteer, event);
    }
}

module.exports = { MockNotificationService, NotificationSystem };
