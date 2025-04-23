import { Request, Response, NextFunction } from 'express';
import orderService from '../services/orderService';

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof userId !== 'number') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    const order = orderService.placeOrder(userId);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
