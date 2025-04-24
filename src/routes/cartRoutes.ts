import { Router } from 'express';
import {
  addItemToCart,
  getCartByUserId,
  removeItemFromCart,
} from '../controllers/cartController';

const router = Router();

router.get('/:userId', getCartByUserId);
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);

export default router;
