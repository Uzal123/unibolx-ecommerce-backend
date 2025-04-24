import { Request, Response, NextFunction } from 'express';
import discountService from '../services/discountService';

export const applyDiscountCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, discountCode } = req.body;
    if (!userId || !discountCode) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof userId !== 'number' || typeof discountCode !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    const order = discountService.applyDiscountCode(userId, discountCode);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const removeDiscountCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, discountCode } = req.body;
    if (!userId || !discountCode) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (
      typeof userId !== 'number' ||
      typeof discountCode !== 'string'
    ) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    const order = discountService.removeDiscountCode(
      userId,
      discountCode,
    );
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getDiscountCodes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const discountCodes = discountService.getDiscountCodes();
    res.status(200).json(discountCodes);
  } catch (error) {
    next(error);
  }
};
