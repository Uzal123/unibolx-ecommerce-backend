import { Request, Response, NextFunction } from 'express';
import adminService from '../services/adminService';

/**
 * Retrieves the admin insights data.
 *
 * This function retrieves key insights such as total orders, total revenue,
 * average order value, and more from the admin service. If successful, it
 * responds with the insights data in the response body. If any error occurs,
 * it is passed to the next error handler.
 *
 * @param req - The HTTP request object (not used in this case)
 * @param res - The HTTP response object used to send back the insights data
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const getInsights = async (
  req: Request, // The request object (not used in this function)
  res: Response, // The response object to send back the insights
  next: NextFunction, // The next function for error handling
) => {
  try {
    // Fetch insights from the admin service
    const insights = adminService.getInsights();

    // Respond with the insights data
    res.status(200).json(insights);
  } catch (error) {
    // Pass any errors to the next error handler
    next(error);
  }
};

/**
 * Creates a new discount code with a specified percentage.
 *
 * This function validates the provided discount percentage, ensures that it is
 * a valid number, and then calls the admin service to create the discount code.
 * If successful, it responds with the created discount code. If the input data is
 * invalid or missing, it returns a `400` error with a message. If any error occurs
 * during the creation process, it is passed to the next error handler.
 *
 * @param req - The HTTP request object containing the percentage in the request body
 * @param res - The HTTP response object used to send back the created discount code or error message
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const createDiscountCode = async (
  req: Request, // The request object containing the discount percentage
  res: Response, // The response object used to send the created discount code or error message
  next: NextFunction, // The next function for error handling
) => {
  try {
    const { percentage } = req.body;

    // Validate the input data
    if (!percentage) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (typeof percentage !== 'number') {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }

    // Create the discount code via the admin service
    const discountCode = adminService.createDiscountCode(percentage);

    // Respond with the created discount code
    res.status(201).json(discountCode);
  } catch (error) {
    // Pass any errors to the next error handler
    next(error);
  }
};
