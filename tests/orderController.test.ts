import { placeOrder } from '../src/controllers/orderController';
import { Request, Response, NextFunction } from 'express';
import orderService from '../src/services/orderService';

// Mock the orderService
jest.mock('../src/services/orderService');

describe('orderController', () => {
  describe('placeOrder', () => {
    it('should return 400 if userId is missing', async () => {
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await placeOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      });
    });

    it('should return 400 if userId is not a number', async () => {
      const req = { body: { userId: 'not-a-number' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await placeOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input data' });
    });

    it('should return order when order is placed successfully', async () => {
      const req = { body: { userId: 1 } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (orderService.placeOrder as jest.Mock).mockResolvedValue({
        orderId: '1234',
        total: 100,
      });

      await placeOrder(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ orderId: '1234', total: 100 });
    });

    it('should call next if an error occurs', async () => {
      const req = { body: { userId: 1 } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (orderService.placeOrder as jest.Mock).mockRejectedValue(
        new Error('Something went wrong'),
      );

      await placeOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Something went wrong'));
    });
  });
});
