import { login } from '../src/controllers/userController';
import { Request, Response, NextFunction } from 'express';
import userService from '../src/services/userService';

// Mock the userService login method
jest.mock('../src/services/userService');

describe('userController', () => {
  describe('login', () => {
    it('should return 400 if username is missing', async () => {
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      });
    });

    it('should return 400 if username is not a string', async () => {
      const req = { body: { username: 123 } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input data' });
    });

    it('should return user details when login is successful', async () => {
      const req = { body: { username: 'user1' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      // Mock the login service
      (userService.login as jest.Mock).mockResolvedValue({
        id: 2,
        username: 'user1',
      });

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 2, username: 'user1' });
    });

    it('should call next if an error occurs', async () => {
      const req = { body: { username: 'user1' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (userService.login as jest.Mock).mockRejectedValue(
        new Error('Something went wrong'),
      );

      await login(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Something went wrong'));
    });
  });
});
