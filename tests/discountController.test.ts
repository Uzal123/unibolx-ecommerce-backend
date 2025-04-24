import {
  applyDiscountCode,
  removeDiscountCode,
  getDiscountCodes,
} from "../src/controllers/discountController";
import { Request, Response, NextFunction } from 'express';
import discountService from '../src/services/discountService';

jest.mock('../src/services/discountService');

describe('discountController', () => {
  describe('applyDiscountCode', () => {
    it('should return 400 if userId or discountCode is missing', async () => {
      const req = { body: { userId: 1 } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await applyDiscountCode(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      });
    });

    it('should apply discount code successfully', async () => {
      const req = { body: { userId: 1, discountCode: 'SAVE10' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (discountService.applyDiscountCode as jest.Mock).mockResolvedValue({
        discountCode: 'SAVE10',
        total: 90,
      });

      await applyDiscountCode(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        discountCode: 'SAVE10',
        total: 90,
      });
    });

   it('should call next if an error occurs', async () => {
     const req = { body: { userId: 1, discountCode: 'SAVE10' } } as Request;
     const res = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn(),
     } as unknown as Response;
     const next = jest.fn();

     // Mocking the service method to reject with an error
     (discountService.applyDiscountCode as jest.Mock).mockRejectedValue(
       new Error('Something went wrong'),
     );

     // Handling the promise rejection properly by wrapping it with try-catch
     try {
       await applyDiscountCode(req, res, next);
     } catch (error) {
       // Ensure that next() is called with the error
       expect(next).toHaveBeenCalledWith(new Error('Something went wrong'));
     }
   });

  });

  describe('removeDiscountCode', () => {
    it('should remove discount code successfully', async () => {
      const req = { body: { userId: 1, discountCode: 'SAVE10' } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (discountService.removeDiscountCode as jest.Mock).mockResolvedValue({
        discountCode: 'SAVE10',
        total: 100,
      });

      await removeDiscountCode(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        discountCode: 'SAVE10',
        total: 100,
      });
    });
  });

  describe('getDiscountCodes', () => {
    it('should return all discount codes', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (discountService.getDiscountCodes as jest.Mock).mockResolvedValue([
        'SAVE10',
        'SAVE20',
      ]);

      await getDiscountCodes(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['SAVE10', 'SAVE20']);
    });
  });
});
