const request = require('supertest');
const app = require('../server');

describe('Volunteer History API', () => {
  it('should create a new volunteer history record', async () => {
    const response = await request(app).post('/api/volunteer-history').send({
      volunteerId: 'volunteer123',
      eventId: 1,
      status: 'attended',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.volunteerId).toBe('volunteer123');
    expect(response.body.status).toBe('attended');
  });

  it('should get all volunteer history records', async () => {
    const response = await request(app).get('/api/volunteer-history');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});
