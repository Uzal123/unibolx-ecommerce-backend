import { getAllItems } from '../src/controllers/itemController';
import { Request, Response, NextFunction } from 'express';
import { items } from '../src/models/item';

describe('itemController', () => {
  describe('getAllItems', () => {
    it('should return all items', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await getAllItems(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });

    it('should call next if an error occurs', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      // Simulate an error
      jest.spyOn(res, 'status').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await getAllItems(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('Database error'));
    });
  });
});
