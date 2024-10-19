const request = require('supertest');
const express = require('express');
const volunteerMatchingRoutes = require('../routes/VolunteerMatchingRoutes');

const app = express();
app.use(express.json());
app.use('/api/volunteers', volunteerMatchingRoutes);

describe('VolunteerMatchingRoutes', () => {
    test('POST /match should return 200 and match volunteers', async () => {
        const response = await request(app)
            .post('/api/volunteers/match')
            .send({ volunteers: ['John Doe'], event: 'Charity Event' });

        expect(response.status).toBe(200);
        expect(response.body.matches[0].volunteer).toBe('John Doe');
        expect(response.body.matches[0].event).toBe('Charity Event');
    });
});
