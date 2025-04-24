import { Request, Response, NextFunction } from 'express';
import cartService from '../services/cartService';
import { Cart } from '../models/cart';
import { HttpError } from '../libs/httpError';

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, itemId, quantity } = req.body;
    if (!userId || !itemId || !quantity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (
      typeof userId !== 'number' ||
      typeof itemId !== 'number' ||
      typeof quantity !== 'number'
    ) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    const cart = cartService.addItemToCart(userId, itemId, quantity);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, itemId, quantity } = req.body;
    if (!userId || !itemId || !quantity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (
      typeof userId !== 'number' ||
      typeof itemId !== 'number' ||
      typeof quantity !== 'number'
    ) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    // get the cart for the user
    const cart = cartService.removeItemFromCart(userId, itemId, quantity);
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getCartByUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'Missing required fields' });
      throw new HttpError({
        type: 'BAD_REQUEST',
        message: 'Missing required fields',
        code: 400,
      });
    }
    if (typeof userId !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      throw new HttpError({
        type: 'BAD_REQUEST',
        message: 'Invalid input data',
        code: 400,
      });
    }
    const cart = cartService.getCartByUserId(Number(userId));
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      throw new HttpError({
        type: 'NOT_FOUND',
        message: 'Cart not found',
        code: 404,
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
