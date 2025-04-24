import { Router } from 'express';
import {
  getInsights,
  createDiscountCode,
} from '../controllers/adminController';

// Initialize Express router for admin-related endpoints
const router = Router();

/**
 * @route GET /api/admin/insights
 * @desc Retrieves system-wide insights, including total orders, revenue, discount usage, and cart activity.
 * @access Admin (requires authentication/authorization)
 */
router.get('/insights', getInsights);

/**
 * @route POST /api/admin/discount
 * @desc Creates a new discount code with a specified discount percentage.
 * @access Admin (requires authentication/authorization)
 */
router.post('/discount', createDiscountCode);

// Export the configured router
export default router;
