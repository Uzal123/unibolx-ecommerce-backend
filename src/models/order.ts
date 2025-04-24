/**
 * Represents a cart item, which is an extended form of Item with additional
 * properties like quantity and total price for the cart.
 */
import { CartItem } from './cart';

/**
 * Represents an order made by a user.
 */
export interface Order {
  orderId: string; // Unique identifier for the order (e.g., "123456-1")
  userId: number; // The ID of the user who placed the order
  items: CartItem[]; // List of items in the order (cart items)
  total: number; // Total cost of the items in the order before discounts
  discountCodeUsed?: string; // Discount code used for the order (optional)
  discountAmount?: number; // The discount applied to the order (optional)
  grandTotal: number; // The final amount after applying the discount (total - discountAmount)
}

/**
 * Represents insights related to the business, including order statistics and revenue details.
 */
export interface Insights {
  totalOrders: number; // Total number of orders made
  totalRevenue: number; // Total revenue generated from all orders
  totalCarts: number; // Total number of carts created
  totalItems: number; // Total number of items added across all carts
  averageOrderValue: number; // Average value per order (totalRevenue / totalOrders)
  averageItemsPerCart: number; // Average number of items per cart (totalItems / totalCarts)
  totalDiscountAmount: number; // Total amount of discounts applied across all orders
  totalDiscountCodesUsed: number; // Total number of times discount codes were used in orders
}

// Array to store all the orders
export let orders: Order[] = [];
