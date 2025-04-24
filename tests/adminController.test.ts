import {
  getInsights,
  createDiscountCode,
} from '../src/controllers/adminController';
import { Request, Response, NextFunction } from 'express';
import adminService from '../src/services/adminService';

jest.mock('../src/services/adminService'); // Mocking the service layer

describe('adminController', () => {
  describe('getInsights', () => {
    it('should return insights data', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      const mockInsights = {
        totalOrders: 100,
        totalRevenue: 5000,
        totalCarts: 120,
        totalItems: 400,
        averageOrderValue: 50,
        averageItemsPerCart: 3.33,
        totalDiscountAmount: 200,
        totalDiscountCodesUsed: 30,
      };
      (adminService.getInsights as jest.Mock).mockReturnValue(mockInsights);

      await getInsights(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockInsights);
    });

    it('should call next if an error occurs', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      jest.spyOn(adminService, 'getInsights').mockImplementationOnce(() => {
        throw new Error('Internal Server Error');
      });

      await getInsights(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Internal Server Error'));
    });
  });

  describe('createDiscountCode', () => {
    it('should create a discount code', async () => {
      const req = {
        body: {
          percentage: 10,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      const mockDiscountCode = { code: 'DISCOUNT10', percentage: 10 };
      (adminService.createDiscountCode as jest.Mock).mockReturnValue(
        mockDiscountCode,
      );

      await createDiscountCode(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockDiscountCode);
    });

    it('should return 400 if percentage is missing', async () => {
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await createDiscountCode(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      });
    });

    it('should return 400 if percentage is not a number', async () => {
      const req = {
        body: {
          percentage: 'invalid',
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await createDiscountCode(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input data' });
    });
  });
});
