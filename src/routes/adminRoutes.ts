import { Router } from 'express';
import { getInsights } from '../controllers/adminController';
import { createDiscountCode } from '../controllers/adminController';

const router = Router();

// Route to create a cart
router.get('/insights', getInsights);
router.post('/discount', createDiscountCode);

export default router;
