import { Router } from 'express';
import {
  applyDiscountCode,
  removeDiscountCode,
} from '../controllers/discountController';

const router = Router();

// Route to create a cart
router.post('/apply', applyDiscountCode);
router.post('/remove', removeDiscountCode);

export default router;
