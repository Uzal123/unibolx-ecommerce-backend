import { Request, Response, NextFunction } from 'express';
import { Item, items } from '../models/item';

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
