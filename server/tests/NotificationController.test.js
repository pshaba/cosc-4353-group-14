const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../routes/NotificationRoutes');  // Corrected path

const app = express();
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

jest.mock('../services/notificationService', () => ({
    MockNotificationService: jest.fn(() => ({
        send: jest.fn(),
    })),
    NotificationSystem: jest.fn(() => ({
        sendAssignmentNotification: jest.fn(),
        sendUpdateNotification: jest.fn(),
        sendReminderNotification: jest.fn(),
    })),
}));

describe('Notification Routes', () => {
    it('should send assignment notification', async () => {
        const response = await request(app)
            .post('/api/notifications/sendAssignment')
            .send({ volunteer: { name: 'John' }, event: { name: 'Charity Event' } });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Assignment notification sent');
    });
});
