// server/src/testing/login.test.js

const request = require('supertest');
const express = require('express');
const loginAuthRoutes = require('../routes/loginAuthRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', loginAuthRoutes);

describe('LoginController', () => {
    beforeEach(() => {
        // Clear user data before each test (optional)
        const User = require('../models/loginUserModel');
        User.__resetUsers(); //implemented in loginUserModel.js
    });

    test('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    test('should login an existing user', async () => {
        // First, register a user
        await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('profileComplete');
    });

    test('should return error for invalid email format', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'invalid-email', password: 'password123' });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid email format. Try again.');
    });

    test('should return error for non-existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'nonexistent@example.com', password: 'password123' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email not found.');
    });

    test('should return error for incorrect password', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Password not correct.');
    });
});
