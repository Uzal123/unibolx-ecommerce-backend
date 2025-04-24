import { Request, Response, NextFunction } from 'express';
import adminService from '../services/adminService';

export const getInsights = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const insights = adminService.getInsights();
    res.status(200).json(insights);
  } catch (error) {
    next(error);
  }
};

export const createDiscountCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { percentage } = req.body;
    if (!percentage) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof percentage !== 'number') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    const discountCode = adminService.createDiscountCode(percentage);
    res.status(201).json(discountCode);
  } catch (error) {
    next(error);
  }
};


