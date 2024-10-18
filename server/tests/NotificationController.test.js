const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../controllers/routes/NotificationRoutes'); // Correct path
const { MockNotificationService } = require('../services/notificationService');

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies
app.use('/notifications', notificationRoutes);

// Mock the NotificationService
jest.mock('../services/notificationService');
const notificationService = new MockNotificationService();

describe('Notification Routes', () => {
    beforeEach(() => {
        // Reset the mock before each test
        jest.clearAllMocks();
    });

    test('POST /notifications/sendAssignment should send assignment notification', async () => {
        const response = await request(app)
            .post('/notifications/sendAssignment')
            .send({ volunteer: { name: 'John' }, event: { name: 'Charity Event' } });
        
        expect(notificationService.sendAssignmentNotification).toHaveBeenCalledWith(
            { name: 'John' },
            { name: 'Charity Event' }
        );
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Assignment notification sent');
    });

    // Other test cases remain unchanged
});
