const request = require('supertest');
const express = require('express');
const profileRouter = require('../routes/profile-router'); // Adjust the path as needed

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use('/profile', profileRouter); // Use the profile router

describe('Profile Router Tests', () => {
  describe('POST /profile', () => {
    it('should create a profile and return success', async () => {
      const response = await request(app)
        .post('/profile')
        .send({
          fullName: 'John Doe',
          address1: '123 Main St',
          city: 'Houston',
          state: 'TX',
          zipCode: '12345',
          skills: ['coding'],
          availability: ['2024-10-01', '2024-10-02'],
        });

      expect(response.status).toBe(200);
      expect(response.text).toBe('Profile Saved and Hello from Server ');
    });

    it('should return 400 for invalid state code', async () => {
      const response = await request(app)
        .post('/profile')
        .send({
          fullName: 'John Doe',
          address1: '123 Main St',
          city: 'Houston',
          state: 'ZZ', // Invalid state code
          zipCode: '12345',
          skills: ['coding'],
          availability: ['2024-10-01', '2024-10-02'],
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid US state code.');
    });

    it('should return 400 if full name is less than 2 characters', async () => {
      const response = await request(app)
        .post('/profile')
        .send({
          fullName: 'A', // Invalid full name
          address1: '123 Main St',
          city: 'Houston',
          state: 'TX',
          zipCode: '12345',
          skills: ['coding'],
          availability: ['2024-10-01', '2024-10-02'],
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Full name must be at least 2 characters long.');
    });

    // Add more tests to cover other validation scenarios
  });

  describe('GET /profile', () => {
    it('should return a success message', async () => {
      const response = await request(app).get('/profile');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Profile GET request successful');
    });
  });
});
