import { Router } from 'express';
import {
  addItemToCart,
  getCartByUserId,
  removeItemFromCart,
} from '../controllers/cartController';

// Initialize Express router for cart-related endpoints
const router = Router();

/**
 * @route GET /api/cart/:userId
 * @desc Retrieves the current cart for the specified user by their user ID.
 * @access Public
 */
router.get('/:userId', getCartByUserId);

/**
 * @route POST /api/cart/add
 * @desc Adds an item to the user's cart, or updates the quantity if the item already exists.
 * @access Public
 */
router.post('/add', addItemToCart);

/**
 * @route POST /api/cart/remove
 * @desc Removes an item or reduces its quantity in the user's cart.
 * @access Public
 */
router.post('/remove', removeItemFromCart);

// Export the configured router
export default router;
