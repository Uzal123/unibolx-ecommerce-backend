import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof username !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    const user = userService.login(username);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
