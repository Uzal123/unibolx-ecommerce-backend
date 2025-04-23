import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/api/cart", cartRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
