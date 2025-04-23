import { Router } from 'express';
import {
  addItemToCart,
  removeItemFromCart,
} from '../controllers/cartController';

const router = Router();

// Route to create a cart
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);

export default router;
