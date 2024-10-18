// tests/VolunteerMatchingController.test.js
const request = require('supertest');
const express = require('express');
const volunteerMatchingRoutes = require('../routes/VolunteerMatchingRoutes');  // Correct path

const app = express();
app.use(express.json());  // Middleware for JSON bodies
app.use('/api/matching', volunteerMatchingRoutes);

jest.mock('../services/volunteerMatcher', () => jest.fn().mockImplementation(() => ({
    matchVolunteers: jest.fn().mockReturnValue([{ volunteer: 'John', event: 'Soup Kitchen' }])
})));

describe('Volunteer Matching Routes', () => {
    it('should return matched volunteers', async () => {
        const response = await request(app)
            .post('/api/matching/matchVolunteers')
            .send({
                volunteers: [{ name: 'John', skills: ['cooking'] }],
                events: [{ name: 'Soup Kitchen', requiredSkills: ['cooking'] }]
            });

        expect(response.status).toBe(200);
        expect(response.body.matches).toEqual([{ volunteer: 'John', event: 'Soup Kitchen' }]);
    });
});
