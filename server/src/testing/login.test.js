//npm test
//npm test -- --coverage

// src/components/login.test.js
// server/src/testing/login.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../../client/src/Login'; // Adjust path as necessary
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router for context

// Mock fetch globally
global.fetch = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
    // Render the Login component wrapped in Router before each test
    beforeEach(() => {
        render(
            <Router>
                <Login />
            </Router>
        );
    });

    // Clear mocks after each test to prevent interference
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form', () => {
        // Check if all form elements are present
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('displays error message on invalid email format during login', async () => {
        // Mock a fetch call that returns a 400 error for invalid email format
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({ message: 'Invalid email format. Try again.' }),
        });

        // Fill in the login form and submit
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/Invalid email format/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays error message on email not found during login', async () => {
        // Mock a fetch call that returns a 401 error for email not found
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Email not found.' }),
        });

        // Fill in the login form and submit
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'notfound@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/Email not found/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays error message on incorrect password during login', async () => {
        // Mock a fetch call that returns a 401 error for incorrect password
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Password not correct.' }),
        });

        // Fill in the login form and submit
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/Password not correct/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('navigates to home or profile on successful login', async () => {
        // Mock a successful fetch call for login
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: 'test-token', profileComplete: true }),
        });

        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate,
        }));

        // Fill in the login form and submit
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'correctpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        // Check if the user is navigated to the correct page based on profile completion
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/home');
        });
    });

    test('displays success message on successful registration', async () => {
        // Mock a successful fetch call for registration
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'User registered successfully' }),
        });

        // Open the registration modal
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
        fireEvent.change(screen.getByLabelText(/Email/i, { selector: '#registerEmail' }), { target: { value: 'newuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i, { selector: '#registerPassword' }), { target: { value: 'newpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // Check if the success message is displayed
        const successMessage = await screen.findByText(/User registered successfully/i);
        expect(successMessage).toBeInTheDocument();
    });

    test('displays error message on invalid email format during registration', async () => {
        // Mock a fetch call that returns a 400 error for invalid email format during registration
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({ message: 'Invalid email format. Try again.' }),
        });

        // Open the registration modal and fill out the form then submit
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
        fireEvent.change(screen.getByLabelText(/Email/i, { selector: '#registerEmail' }), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/Password/i, { selector: '#registerPassword' }), { target: { value: 'newpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/Invalid email format/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays error message when user already exists during registration', async () => {
        // Mock a fetch call that returns a 400 error for user already exists
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({ message: 'User already exists' }),
        });

        // Open the registration modal then fill out the form and submit
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
        fireEvent.change(screen.getByLabelText(/Email/i, { selector: '#registerEmail' }), { target: { value: 'existinguser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i, { selector: '#registerPassword' }), { target: { value: 'newpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/User already exists/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('closes modal on outside click', () => {
        // Open the registration modal
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
        expect(screen.getByText(/Register/i)).toBeInTheDocument();

        // Simulate clicking outside modal
        fireEvent.click(screen.getByText(/Register/i).closest('.modal'));

        // Check if the modal is no longer displayed
        expect(screen.queryByText(/Register/i)).not.toBeInTheDocument();
    });
});
