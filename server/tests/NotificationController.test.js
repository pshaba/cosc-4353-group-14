const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../routes/NotificationRoutes');

const app = express();
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

describe('NotificationController', () => {
    test('should handle errors for assignment notifications', async () => {
        const response = await request(app)
            .post('/api/notifications/sendAssignment')
            .send({ volunteer: '', event: '' });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to send notification');
    });

    test('should send update notifications', async () => {
        const response = await request(app)
            .post('/api/notifications/sendUpdate')
            .send({ volunteer: 'John Doe', event: 'Charity Event' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Update notification sent');
    });
});
