const request = require('supertest');
const app = require('../server'); // Adjust the path to your main app
const db = require('../database');

jest.mock('../database', () => ({
    query: jest.fn(),
}));

describe('VolunteerParticipation Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new participation record successfully', async () => {
        db.query.mockResolvedValue([{ insertId: 1 }]);
        const response = await request(app)
            .post('/api/volunteer-participation')
            .send({
                user_id: 1,
                event_id: 1,
                participation_date: '2024-10-01',
                hours_volunteered: 5.0,
                role: 'Helper',
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: 'Participation record created',
            participation_id: 1,
        });
    });

    test('should return an error when creating a participation record fails', async () => {
        db.query.mockRejectedValue(new Error('Database error'));
        const response = await request(app)
            .post('/api/volunteer-participation')
            .send({
                user_id: 1,
                event_id: 1,
                participation_date: '2024-10-01',
                hours_volunteered: 5.0,
                role: 'Helper',
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error occurred while creating participation record.' });
    });

    test('should retrieve all participation records successfully', async () => {
        db.query.mockResolvedValue([[{ participation_id: 1, user_id: 1, event_id: 1 }]]);
        const response = await request(app).get('/api/volunteer-participation');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return an error when retrieving all participation records fails', async () => {
        db.query.mockRejectedValue(new Error('Database error'));
        const response = await request(app).get('/api/volunteer-participation');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error occurred while retrieving records.' });
    });

    test('should retrieve participation records by user ID', async () => {
        db.query.mockResolvedValue([[{ participation_id: 1, user_id: 1, event_id: 1 }]]);
        const response = await request(app).get('/api/volunteer-participation/user/1');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should return an error when retrieving participation records by user ID fails', async () => {
        db.query.mockRejectedValue(new Error('Database error'));
        const response = await request(app).get('/api/volunteer-participation/user/1');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error occurred while retrieving the record.' });
    });

    test('should update a participation record successfully', async () => {
        db.query.mockResolvedValue([{ affectedRows: 1 }]);
        const response = await request(app)
            .put('/api/volunteer-participation/1')
            .send({ hours_volunteered: 8.0, role: 'Lead' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Participation record updated.' });
    });

    test('should return an error when updating a participation record fails', async () => {
        db.query.mockRejectedValue(new Error('Database error'));
        const response = await request(app)
            .put('/api/volunteer-participation/1')
            .send({ hours_volunteered: 8.0, role: 'Lead' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error occurred while updating the record.' });
    });

    test('should delete a participation record successfully', async () => {
        db.query.mockResolvedValue([{ affectedRows: 1 }]);
        const response = await request(app).delete('/api/volunteer-participation/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Participation record deleted.' });
    });

    test('should return an error when deleting a participation record fails', async () => {
        db.query.mockRejectedValue(new Error('Database error'));
        const response = await request(app).delete('/api/volunteer-participation/1');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error occurred while deleting the record.' });
    });
});
