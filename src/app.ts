import express from 'express';
import { errorHandler } from './libs/errorHandler';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import discountRoutes from './routes/discountRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import itemsRoutes from './routes/itemRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/items', itemsRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
