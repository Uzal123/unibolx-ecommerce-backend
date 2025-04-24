import { Router } from 'express';
import { getAllItems } from '../controllers/itemController';

const router = Router();

// Route to create a cart
router.get('/', getAllItems);

export default router;
