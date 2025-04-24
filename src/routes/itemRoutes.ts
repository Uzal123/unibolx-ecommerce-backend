import { Router } from 'express';
import { getAllItems } from '../controllers/itemController';

// Initialize Express router for item-related endpoints
const router = Router();

/**
 * @route GET /api/items
 * @desc Fetches and returns all available items in the store.
 * @access Public
 */
router.get('/', getAllItems);

// Export the configured router
export default router;
