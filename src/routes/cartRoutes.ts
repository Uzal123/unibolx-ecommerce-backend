import { Router } from 'express';
import { addItemToCart, createCart } from '../controllers/cartController';

const router = Router();

// Route to create a cart
router.post('/create', createCart);
router.post('/add-item', addItemToCart);

export default router;
