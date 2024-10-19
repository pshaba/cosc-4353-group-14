//  NotificationRoutes.test.js

const request = require('supertest');
const express = require('express');
const notificationRoutes = require('../routes/notificationRoutes');

const app = express();
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

describe('NotificationRoutes', () => {
    test('POST /sendAssignment should return 200', async () => {
        const response = await request(app)
            .post('/api/notifications/sendAssignment')
            .send({ volunteer: 'Jane Doe', event: 'Charity Event' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Assignment notification sent to Jane Doe for Charity Event');
    });
});
