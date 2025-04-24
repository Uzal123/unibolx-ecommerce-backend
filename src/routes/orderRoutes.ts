import { Router } from 'express';
import { placeOrder } from '../controllers/orderController';

// Initialize Express router for handling order-related endpoints
const router = Router();

/**
 * @route POST /api/order
 * @desc Places an order for the specified user by using the items in their cart.
 *       Clears the cart after successful order placement.
 * @access Public (can be secured later with auth middleware)
 */
router.post('/', placeOrder);

// Export the configured router
export default router;
