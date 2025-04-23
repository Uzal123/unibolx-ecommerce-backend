import { Router } from 'express';
import { placeOrder } from '../controllers/orderController';

const router = Router();

// Route to create a cart
router.post('/', placeOrder);

export default router;
