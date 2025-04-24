import { Request, Response, NextFunction } from 'express';
import { Item, items } from '../models/item';

/**
 * Fetches all available items.
 *
 * This function retrieves all the items from the `items` model and sends them
 * back in the response. It ensures the request is handled properly, and if
 * an error occurs, it is passed to the next middleware for error handling.
 *
 * @param req - The HTTP request object (not used in this specific endpoint)
 * @param res - The HTTP response object used to send the items to the client
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const getAllItems = async (
  req: Request, // The request object (not needed here but included for consistency)
  res: Response, // The response object that will send back the list of items
  next: NextFunction, // The next function that handles errors or passes control to other middlewares
) => {
  try {
    // Respond with the list of all items with status 200 (OK)
    res.status(200).json(items);
  } catch (error) {
    // If any error occurs, pass it to the next error handler
    next(error);
  }
};
