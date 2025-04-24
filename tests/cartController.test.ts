import {
  addItemToCart,
  removeItemFromCart,
  getCartByUserId,
} from '../src/controllers/cartController';
import { Request, Response, NextFunction } from 'express';
import cartService from '../src/services/cartService';
import { Cart } from '../src/models/cart';

jest.mock('../src/services/cartService'); // Mocking the service layer

describe('cartController', () => {
  describe('addItemToCart', () => {
    it('should add item to cart', async () => {
      const req = {
        body: {
          userId: 1,
          itemId: 1,
          quantity: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      const mockCart: Cart = {
        userId: 1,
        items: [
          {
            id: 1,
            name: 'Laptop',
            quantity: 1,
            totalPrice: 999.99,
            price: 0,
          },
        ],
        total: 999.99,
        grandTotal: 999.99,
      };
      (cartService.addItemToCart as jest.Mock).mockReturnValue(mockCart);

      await addItemToCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCart);
    });

    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {
          userId: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await addItemToCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      });
    });

    it('should return 400 if input data is invalid', async () => {
      const req = {
        body: {
          userId: 'invalid',
          itemId: 1,
          quantity: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await addItemToCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input data' });
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove item from cart', async () => {
      const req = {
        body: {
          userId: 1,
          itemId: 1,
          quantity: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      const mockCart: Cart = {
        userId: 1,
        items: [],
        total: 0,
        grandTotal: 0,
      };
      (cartService.removeItemFromCart as jest.Mock).mockReturnValue(mockCart);

      await removeItemFromCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCart);
    });

    it('should return 404 if cart is not found', async () => {
      const req = {
        body: {
          userId: 1,
          itemId: 1,
          quantity: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (cartService.removeItemFromCart as jest.Mock).mockReturnValue(null);

      await removeItemFromCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cart not found' });
    });

    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {
          userId: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await removeItemFromCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      });
    });

    it('should return 400 if input data is invalid', async () => {
      const req = {
        body: {
          userId: 'invalid',
          itemId: 1,
          quantity: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await removeItemFromCart(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid input data' });
    });
  });

  describe('getCartByUserId', () => {
    it('should return the cart by userId', async () => {
      const req = {
        params: {
          userId: '1',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      const mockCart: Cart = {
        userId: 1,
        items: [
          {
            id: 1,
            name: 'Laptop',
            quantity: 1,
            totalPrice: 999.99,
            price: 0,
          },
        ],
        total: 999.99,
        grandTotal: 999.99,
      };
      (cartService.getCartByUserId as jest.Mock).mockReturnValue(mockCart);

      await getCartByUserId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCart);
    });

    it('should return 404 if cart not found', async () => {
      const req = {
        params: {
          userId: '999',
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      (cartService.getCartByUserId as jest.Mock).mockReturnValue(null);

      await getCartByUserId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cart not found' });
    });
  });
});
