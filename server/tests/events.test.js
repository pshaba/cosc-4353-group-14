const request = require('supertest');
const app = require('../server');

describe('Event API', () => {
  it('should create a new event', async () => {
    const response = await request(app).post('/api/events').send({
      eventName: 'Sample Event',
      eventDescription: 'Event Description',
      location: 'Sample Location',
      requiredSkills: ['Skill1', 'Skill2'],
      urgency: 'high',
      eventDate: '2024-12-01',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.eventName).toBe('Sample Event');
  });

  it('should get all events', async () => {
    const response = await request(app).get('/api/events');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
