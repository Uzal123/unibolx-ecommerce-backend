import { carts } from '../models/cart';
import { orders } from '../models/order';
import discountService from './discountService';

/**
 * Gathers and calculates system-wide analytics for the admin dashboard.
 *
 * @returns An object containing insights about orders, revenue, discounts, and cart activity.
 */
const getInsights = () => {
  const totalOrders = orders.length;

  // Calculate total revenue from all orders
  const totalRevenue = orders.reduce((acc, order) => acc + order.grandTotal, 0);

  const totalCarts = carts.length;

  // Total number of items across all carts
  const totalItems = carts.reduce((acc, cart) => acc + cart.items.length, 0);

  // Average revenue per order
  const averageOrderValue = totalRevenue / totalOrders || 0;

  // Average number of items per cart
  const averageItemsPerCart = totalItems / totalCarts || 0;

  // Total value of discounts applied
  const totalDiscountAmount = orders.reduce(
    (acc, order) => acc + (order.discountAmount || 0),
    0,
  );

  // Total number of orders that used a discount code
  const totalDiscountCodesUsed = orders.filter(
    (order) => order.discountCodeUsed,
  ).length;

  // Get currently active discount codes
  const discountCodes = discountService.getDiscountCodes();

  const totalDiscountCodes = discountCodes.length;

  return {
    totalOrders,
    totalRevenue,
    totalCarts,
    totalItems,
    averageOrderValue,
    averageItemsPerCart,
    totalDiscountAmount,
    discountCodes,
    totalDiscountCodesUsed,
    totalDiscountCodes,
  };
};

/**
 * Allows the admin to create a global discount code.
 *
 * @param percentage - The discount percentage for the code.
 * @returns The newly created discount code object.
 */
const createDiscountCode = (percentage: number) => {
  return discountService.createDiscountCode(percentage);
};

// Admin service exports
const adminService = {
  getInsights,
  createDiscountCode,
};

export default adminService;
