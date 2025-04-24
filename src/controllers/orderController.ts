import { Request, Response, NextFunction } from 'express';
import orderService from '../services/orderService';

/**
 * Place an order for a user.
 *
 * This function handles the order placement by first validating the userId in
 * the request body. If valid, it proceeds with placing the order by calling
 * the order service. It returns appropriate responses based on success or failure.
 *
 * @param req - The HTTP request object containing the userId for placing the order
 * @param res - The HTTP response object used to send back the response
 * @param next - A function that passes control to the next middleware or error handler
 */
export const placeOrder = async (
  req: Request, // The request object containing the user input data
  res: Response, // The response object used to send the response back to the client
  next: NextFunction, // The next middleware or error handler in the chain
) => {
  try {
    // Extract 'userId' from the request body
    const { userId } = req.body;

    // Check if the 'userId' field is present in the request body
    if (!userId) {
      res.status(400).json({ message: 'Missing required fields' });
      return; // Stop execution and send a response if the userId is missing
    }

    // Validate that the 'userId' is a number
    if (typeof userId !== 'number') {
      res.status(400).json({ message: 'Invalid input data' });
      return; // Stop execution and send a response if the userId is not a number
    }

    // Call the order service to place the order for the given userId
    const order = await orderService.placeOrder(userId);

    // If the order is placed successfully, respond with the order details and status 200 (OK)
    res.status(200).json(order);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};
