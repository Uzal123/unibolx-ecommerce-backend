import { Router } from 'express';
import { login } from '../controllers/userController';

const router = Router();

// Route to create a cart
router.post('/login', login);

export default router;
