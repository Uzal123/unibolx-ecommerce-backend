import { Request, Response, NextFunction } from 'express';
import cartService from '../services/cartService';
import { Cart } from '../models/cart';
import { HttpError } from '../libs/httpError';

/**
 * Adds an item to the user's shopping cart.
 *
 * This function validates the provided userId, itemId, and quantity, checks if
 * the data is valid, and then adds the specified item to the user's cart. If the
 * data is invalid or missing, it returns an error response. If the item is successfully
 * added to the cart, it returns the updated cart.
 *
 * @param req - The HTTP request object containing userId, itemId, and quantity in the body
 * @param res - The HTTP response object used to send back the updated cart or error message
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const addItemToCart = async (
  req: Request, // The request object containing the necessary fields (userId, itemId, quantity)
  res: Response, // The response object used to send the updated cart or error message
  next: NextFunction, // The next function for error handling
) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Validate input data
    if (!userId || !itemId || !quantity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (
      typeof userId !== 'number' ||
      typeof itemId !== 'number' ||
      typeof quantity !== 'number'
    ) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }

    // Add the item to the cart
    const cart = cartService.addItemToCart(userId, itemId, quantity);

    // Respond with the updated cart
    res.status(201).json(cart);
  } catch (error) {
    // Pass any errors to the next error handler
    next(error);
  }
};

/**
 * Removes an item from the user's shopping cart.
 *
 * This function validates the provided userId, itemId, and quantity, checks if
 * the data is valid, and then removes the specified item from the user's cart.
 * If the cart is not found or any other error occurs, it returns an appropriate error response.
 * If the item is successfully removed from the cart, it returns the updated cart.
 *
 * @param req - The HTTP request object containing userId, itemId, and quantity in the body
 * @param res - The HTTP response object used to send the updated cart or error message
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const removeItemFromCart = (
  req: Request, // The request object containing the necessary fields (userId, itemId, quantity)
  res: Response, // The response object used to send the updated cart or error message
  next: NextFunction, // The next function for error handling
) => {
  try {
    const { userId, itemId, quantity } = req.body;

    // Validate input data
    if (!userId || !itemId || !quantity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (
      typeof userId !== 'number' ||
      typeof itemId !== 'number' ||
      typeof quantity !== 'number'
    ) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }

    // Get the cart for the user and remove the item
    const cart = cartService.removeItemFromCart(userId, itemId, quantity);

    // If cart not found, return a 404 error
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    // Respond with the updated cart
    res.status(200).json(cart);
  } catch (error) {
    // Pass any errors to the next error handler
    next(error);
  }
};

/**
 * Retrieves the user's shopping cart based on userId.
 *
 * This function validates the provided userId, checks if the cart exists, and
 * returns the cart data. If the cart is not found or the userId is invalid,
 * it responds with an error. If the cart is found, it returns the cart details.
 *
 * @param req - The HTTP request object containing userId in the request params
 * @param res - The HTTP response object used to send back the cart or error message
 * @param next - The next function used to pass any errors to the error-handling middleware
 */
export const getCartByUserId = (
  req: Request, // The request object containing the userId in the params
  res: Response, // The response object used to send the cart or error message
  next: NextFunction, // The next function for error handling
) => {
  try {
    const { userId } = req.params;

    // Validate input data
    if (!userId) {
      res.status(400).json({ message: 'Missing required fields' });
      throw new HttpError({
        type: 'BAD_REQUEST',
        message: 'Missing required fields',
        code: 400,
      });
    }
    if (typeof userId !== 'string') {
      res.status(400).json({ message: 'Invalid input data' });
      throw new HttpError({
        type: 'BAD_REQUEST',
        message: 'Invalid input data',
        code: 400,
      });
    }

    // Get the cart for the user
    const cart = cartService.getCartByUserId(Number(userId));

    // If cart not found, return a 404 error
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      throw new HttpError({
        type: 'NOT_FOUND',
        message: 'Cart not found',
        code: 404,
      });
    }

    // Respond with the cart
    res.status(200).json(cart);
  } catch (error) {
    // Pass any errors to the next error handler
    next(error);
  }
};
