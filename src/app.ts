import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import discountRoutes from './routes/discountRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/discount', discountRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
