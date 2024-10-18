const { createProfile, getProfile } = require('../controllers/profileController');

// Mock req and res objects
const mockRequest = (body = {}) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Profile Controller Tests', () => {
  describe('createProfile', () => {
    it('should return 400 if full name is less than 2 characters', () => {
      const req = mockRequest({ fullName: 'A' });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Full name must be at least 2 characters long.' });
    });

    it('should return 400 if address1 is invalid', () => {
      const req = mockRequest({ fullName: 'John Doe', address1: '123' });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Address 1 is not a valid US address format.' });
    });

    it('should return 400 if city is missing', () => {
      const req = mockRequest({ fullName: 'John Doe', address1: '123 Main St', city: '' });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'City is required.' });
    });

    it('should return 400 if state is invalid', () => {
      const req = mockRequest({ fullName: 'John Doe', address1: '123 Main St', city: 'Houston', state: 'XX' });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid US state code.' });
    });

    it('should return 400 if zip code is invalid', () => {
      const req = mockRequest({ fullName: 'John Doe', address1: '123 Main St', city: 'Houston', state: 'TX', zipCode: '1234' });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid zip code format. Must be 5 or 9 digits.' });
    });

    it('should return 400 if no skills are provided', () => {
      const req = mockRequest({ fullName: 'John Doe', address1: '123 Main St', city: 'Houston', state: 'TX', zipCode: '12345', skills: [] });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'At least one skill must be selected.' });
    });

    it('should return 400 if availability is invalid', () => {
      const req = mockRequest({ fullName: 'John Doe', address1: '123 Main St', city: 'Houston', state: 'TX', zipCode: '12345', skills: ['coding'], availability: ['invalid-date'] });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Availability must be an array of valid dates.' });
    });

    it('should return success if all fields are valid', () => {
      const req = mockRequest({
        fullName: 'John Doe',
        address1: '123 Main St',
        city: 'Houston',
        state: 'TX',
        zipCode: '12345',
        skills: ['coding'],
        availability: ['2024-10-01', '2024-10-02'],
      });
      const res = mockResponse();

      createProfile(req, res);
      expect(res.status).not.toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Profile Saved and Hello from Server ');
    });
  });

  describe('getProfile', () => {
    it('should return profile get response successfully', () => {
      const req = mockRequest();
      const res = mockResponse();

      getProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Profile GET request successful' });
    });
  });
});
