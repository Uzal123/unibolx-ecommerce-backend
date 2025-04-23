import { carts } from '../models/cart';
import { Order, orders } from '../models/order';

const placeOrder = (userId: number): Order => {
  const userCart = carts.find((cart) => cart.userId === userId);
  if (!userCart) {
    throw new Error('Cart not found');
  }
  if (userCart.items.length === 0) {
    throw new Error('Cart is empty');
  }
  const order: Order = {
    orderId: `${Math.floor(Math.random() * 1000000)}+${userId}`, // Generate a random order ID
    userId: userId,
    items: userCart.items,
    total: userCart.total,
    discountCodeUsed: userCart.discountCodeUsed,
    discountAmount: userCart.discountAmount,
    grandTotal: userCart.grandTotal,
  };
  // Clear the user's cart after placing the order
  userCart.items = [];
  userCart.total = 0;
  userCart.discountCodeUsed = undefined;
  userCart.discountAmount = undefined;
  userCart.grandTotal = 0;
  // Add the order to the orders array (or database)
  orders.push(order); // Uncomment if you have an orders array
  return order;
};

const orderService = {
  placeOrder,
};

export default orderService;
