import { Request, Response, NextFunction } from 'express';
import cartService from '../services/cartService';

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
