import { carts } from '../models/cart';
import { Order, orders } from '../models/order';

/**
 * Places an order for a given user based on their cart contents.
 *
 * - Throws an error if the user's cart is not found or is empty.
 * - Transfers all items from the cart to a new order.
 * - Clears the user's cart after the order is placed.
 * - Appends the order to the orders list.
 *
 * @param userId - The ID of the user placing the order.
 * @returns The newly created Order object.
 */
const placeOrder = (userId: number): Order => {
  // Find the user's cart based on userId
  const userCart = carts.find((cart) => cart.userId === userId);

  if (!userCart) {
    throw new Error('Cart not found');
  }

  if (userCart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  // Create a new order using the cart contents
  const order: Order = {
    orderId: `${Math.floor(Math.random() * 1000000)}+${userId}`, // Generate a simple unique order ID
    userId: userId,
    items: userCart.items,
    total: userCart.total,
    discountCodeUsed: userCart.discountCodeUsed,
    discountAmount: userCart.discountAmount,
    grandTotal: userCart.grandTotal,
  };

  // Clear the cart after placing the order
  userCart.items = [];
  userCart.total = 0;
  userCart.discountCodeUsed = undefined;
  userCart.discountAmount = undefined;
  userCart.grandTotal = 0;

  // Save the order to the in-memory orders array
  orders.push(order);

  return order;
};

// Export service for external use
const orderService = {
  placeOrder,
};

export default orderService;
