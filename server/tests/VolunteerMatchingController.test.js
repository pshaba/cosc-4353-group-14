// VolunteerMatchingController.test.js

const request = require('supertest');
const express = require('express');
const volunteerMatchingRoutes = require('../routes/volunteerMatchingRoutes');

const app = express();
app.use(express.json());
app.use('/api/volunteers', volunteerMatchingRoutes);

describe('VolunteerMatchingController', () => {
    test('should handle errors for matching volunteers', async () => {
        const response = await request(app)
            .post('/api/volunteers/match')
            .send({ volunteers: '', event: '' });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to match volunteers');
    });

    test('should match volunteers', async () => {
        const response = await request(app)
            .post('/api/volunteers/match')
            .send({ volunteers: ['John Doe'], event: 'Charity Event' });
        expect(response.status).toBe(200);
        expect(response.body.matches[0].volunteer).toBe('John Doe');
        expect(response.body.matches[0].event).toBe('Charity Event');
    });
});
