const request = require('supertest');
const express = require('express');
const volunteerMatchingRoutes = require('../controllers/routes/VolunteerMatchingRoutes'); // Correct path
const VolunteerMatcher = require('../services/volunteerMatcher');

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies
app.use('/volunteerMatching', volunteerMatchingRoutes);

// Mock the VolunteerMatcher service
jest.mock('../services/volunteerMatcher');
const mockMatchVolunteers = jest.fn();
VolunteerMatcher.mockImplementation(() => ({
    matchVolunteers: mockMatchVolunteers
}));

describe('Volunteer Matching Routes', () => {
    beforeEach(() => {
        // Reset the mock before each test
        jest.clearAllMocks();
    });

    test('POST /volunteerMatching/matchVolunteers should return matched volunteers', async () => {
        const volunteers = [{ name: 'John', skills: ['cooking'] }];
        const events = [{ name: 'Soup Kitchen', requiredSkills: ['cooking'] }];
        mockMatchVolunteers.mockReturnValue([{ volunteer: 'John', event: 'Soup Kitchen' }]);

        const response = await request(app)
            .post('/volunteerMatching/matchVolunteers')
            .send({ volunteers, events });

        expect(mockMatchVolunteers).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.matches).toEqual([{ volunteer: 'John', event: 'Soup Kitchen' }]);
    });

    // Other test cases remain unchanged
});
