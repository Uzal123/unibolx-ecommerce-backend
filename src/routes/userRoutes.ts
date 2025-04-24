import { Router } from 'express';
import { login } from '../controllers/userController';

// Initialize an Express router instance for user-related routes
const router = Router();

/**
 * @route POST /api/user/login
 * @desc Logs in a user by username. If the user doesn't exist, creates a new one.
 * @access Public
 */
router.post('/login', login);

// Export the configured router
export default router;
