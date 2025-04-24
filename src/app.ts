import express from 'express';
import { errorHandler } from './libs/errorHandler';

import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import discountRoutes from './routes/discountRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import itemsRoutes from './routes/itemRoutes';

import cors from 'cors';

/**
 * Initializes and configures the Express application instance.
 *
 * This instance is responsible for:
 * - Parsing JSON request bodies
 * - Enabling Cross-Origin Resource Sharing (CORS)
 * - Registering route handlers for different API modules
 * - Defining a global error-handling middleware
 */
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to enable CORS for all incoming requests
app.use(cors());

// Registering route handlers for different API segments
app.use('/api/cart', cartRoutes); // Handles cart-related operations
app.use('/api/order', orderRoutes); // Handles order processing and retrieval
app.use('/api/discount', discountRoutes); // Handles discount logic (e.g., nth-order discounts)
app.use('/api/user', userRoutes); // Handles user-related actions like login/register
app.use('/api/admin', adminRoutes); // Handles admin functionality (e.g., view stats, user mgmt)
app.use('/api/items', itemsRoutes); // Handles product/item-related APIs

// Centralized error-handling middleware
app.use(errorHandler);

// Export the configured Express app instance
export default app;
