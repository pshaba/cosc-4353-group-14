// notificationSystem.js
class NotificationSystem {
    constructor(notificationService) {
        this.notificationService = notificationService;  // Mock or actual email/SMS service
    }

    sendAssignmentNotification(volunteer, event) {
        const message = `Hi ${volunteer.name}, you have been assigned to the event: ${event.name}.`;
        this.notificationService.send(volunteer.email, message);
    }

    sendUpdateNotification(volunteer, event, updates) {
        const message = `Hi ${volunteer.name}, the event ${event.name} has the following updates: ${updates}.`;
        this.notificationService.send(volunteer.email, message);
    }

    sendReminderNotification(volunteer, event) {
        const message = `Hi ${volunteer.name}, this is a reminder for the event: ${event.name} happening on ${event.date}.`;
        this.notificationService.send(volunteer.email, message);
    }
}

class MockNotificationService {
    send(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }
}

module.exports = { NotificationSystem, MockNotificationService };
