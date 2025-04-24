import { Router } from 'express';
import {
  applyDiscountCode,
  removeDiscountCode,
} from '../controllers/discountController';

// Initialize Express router for discount-related endpoints
const router = Router();

/**
 * @route POST /api/discount/apply
 * @desc Applies a discount code to the user's cart, adjusting the total and grand total.
 * @access Public
 */
router.post('/apply', applyDiscountCode);

/**
 * @route POST /api/discount/remove
 * @desc Removes a previously applied discount code from the user's cart.
 *       Restores the cart totals accordingly.
 * @access Public
 */
router.post('/remove', removeDiscountCode);

// Export the configured router
export default router;
