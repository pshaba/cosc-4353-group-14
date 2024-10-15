const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../routes/NotificationRoutes');
const { NotificationSystem, MockNotificationService } = require('../services/notificationService');

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies
app.use('/notifications', notificationRoutes);

// Mock the NotificationService
jest.mock('../services/notificationService');
const notificationService = new MockNotificationService();
const notificationSystem = new NotificationSystem(notificationService);

describe('Notification Routes', () => {
    beforeEach(() => {
        // Reset the mock before each test
        jest.clearAllMocks();
    });

    test('POST /notifications/sendAssignment should send assignment notification', async () => {
        const response = await request(app)
            .post('/notifications/sendAssignment')
            .send({ volunteer: { name: 'John' }, event: { name: 'Charity Event' } });
        
        expect(notificationSystem.sendAssignmentNotification).toHaveBeenCalledWith(
            { name: 'John' },
            { name: 'Charity Event' }
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Assignment notification sent');
    });

    test('POST /notifications/sendUpdate should send update notification', async () => {
        const response = await request(app)
            .post('/notifications/sendUpdate')
            .send({
                volunteer: { name: 'Jane' },
                event: { name: 'Fundraising Event' },
                updates: { location: 'New Park' },
            });
        
        expect(notificationSystem.sendUpdateNotification).toHaveBeenCalledWith(
            { name: 'Jane' },
            { name: 'Fundraising Event' },
            { location: 'New Park' }
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Update notification sent');
    });

    test('POST /notifications/sendReminder should send reminder notification', async () => {
        const response = await request(app)
            .post('/notifications/sendReminder')
            .send({ volunteer: { name: 'Sarah' }, event: { name: 'Cleanup Event' } });
        
        expect(notificationSystem.sendReminderNotification).toHaveBeenCalledWith(
            { name: 'Sarah' },
            { name: 'Cleanup Event' }
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Reminder notification sent');
    });

    test('POST /notifications/sendAssignment should return 400 for missing fields', async () => {
        const response = await request(app)
            .post('/notifications/sendAssignment')
            .send({ volunteer: { name: 'John' } }); // Missing event
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid data');
    });

    test('POST /notifications/sendUpdate should return 400 for missing fields', async () => {
        const response = await request(app)
            .post('/notifications/sendUpdate')
            .send({ event: { name: 'Fundraising Event' } }); // Missing volunteer and updates
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid data');
    });

    test('POST /notifications/sendReminder should return 400 for missing fields', async () => {
        const response = await request(app)
            .post('/notifications/sendReminder')
            .send({}); // Missing volunteer and event
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid data');
    });
});
