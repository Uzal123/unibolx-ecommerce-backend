import { Request, Response, NextFunction } from 'express';
import { cart, Cart } from '../models/cart';

export const createCart = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    if (typeof userId !== 'number') {
      res.status(400).json({ message: 'Invalid userId' });
    }
    const newCart: Cart = {
      userId,
      items: [],
      total: 0,
      discountCodeUsed: undefined,
      discountedTotal: undefined,
      grandTotal: 0,
    };
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};

export const addItemToCart = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId, quantity } = req.body;
    const cartItem = cart.items.find((item) => item.id === itemId);
    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.totalPrice += cartItem.price * quantity;
    } else {
      res.status(404).json({ message: 'Item not found in the cart' });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
