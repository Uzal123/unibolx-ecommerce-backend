import { Request, Response, NextFunction } from 'express';
import discountService from '../services/discountService';

/**
 * Applies a discount code to an order for a specific user.
 *
 * This function validates the provided userId and discountCode, checks if the
 * discount code is valid, and applies it to the user's order. If the discount
 * is applied successfully, it returns the updated order. If any validation fails,
 * it returns an error response.
 *
 * @param req - The HTTP request object containing userId and discountCode in the body
 * @param res - The HTTP response object used to send back the updated order or error message
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const applyDiscountCode = async (
  req: Request, // The request object containing the necessary fields (userId, discountCode)
  res: Response, // The response object used to send the updated order or error message
  next: NextFunction, // The next function for error handling
) => {
  try {
    const { userId, discountCode } = req.body;

    // Validate input data
    if (!userId || !discountCode) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof userId !== 'number' || typeof discountCode !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }

    // Apply the discount code
    const order = discountService.applyDiscountCode(userId, discountCode);

    // Respond with the updated order
    res.status(200).json(order);
  } catch (error) {
    // If an error occurs, pass it to the next middleware for error handling
    next(error);
  }
};

/**
 * Removes a discount code from an order for a specific user.
 *
 * This function validates the provided userId and discountCode, checks if the
 * discount code exists on the order, and removes it. It returns the updated order
 * if the discount code is successfully removed. If validation fails, it returns an error response.
 *
 * @param req - The HTTP request object containing userId and discountCode in the body
 * @param res - The HTTP response object used to send back the updated order or error message
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const removeDiscountCode = async (
  req: Request, // The request object containing userId and discountCode in the body
  res: Response, // The response object used to send the updated order or error message
  next: NextFunction, // The next function for error handling
) => {
  try {
    const { userId, discountCode } = req.body;

    // Validate input data
    if (!userId || !discountCode) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof userId !== 'number' || typeof discountCode !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }

    // Remove the discount code from the order
    const order = discountService.removeDiscountCode(userId, discountCode);

    // Respond with the updated order
    res.status(200).json(order);
  } catch (error) {
    // If an error occurs, pass it to the next middleware for error handling
    next(error);
  }
};

/**
 * Retrieves all available discount codes.
 *
 * This function fetches the list of all discount codes and sends them in the
 * response. It handles any errors by passing them to the next middleware.
 *
 * @param req - The HTTP request object (not used in this specific endpoint)
 * @param res - The HTTP response object used to send the list of discount codes
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const getDiscountCodes = async (
  req: Request, // The request object (not needed here but included for consistency)
  res: Response, // The response object that will send the list of discount codes
  next: NextFunction, // The next function that handles errors or passes control to other middlewares
) => {
  try {
    // Fetch the discount codes from the discount service
    const discountCodes = discountService.getDiscountCodes();

    // Respond with the list of discount codes
    res.status(200).json(discountCodes);
  } catch (error) {
    // If any error occurs, pass it to the next error handler
    next(error);
  }
};
