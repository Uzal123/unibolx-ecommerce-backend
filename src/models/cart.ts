import { Discount } from './discount';
import { Item } from './item';

/**
 * Represents an individual item in the cart with quantity and total price.
 * Extends the base Item model to include quantity and totalPrice.
 */
export interface CartItem extends Item {
  quantity: number; // Quantity of the item in the cart
  totalPrice: number; // Total price for the given quantity (item price * quantity)
}

/**
 * Represents the cart for a specific user.
 * Holds items, discount information, and total calculations.
 */
export interface Cart {
  userId: number | null; // The user ID who owns the cart (null if not logged in)
  items: CartItem[]; // List of items in the cart
  total: number; // The sum of all item prices in the cart (before discounts)
  availableDiscountCodes?: Discount[]; // List of available discount codes for the user
  discountCodeUsed?: string; // Discount code currently applied to the cart
  discountAmount?: number; // Total discount amount applied
  grandTotal: number; // Final total after discounts are applied
}

// Default cart object for initialization
export let cart: Cart = {
  userId: null,
  items: [],
  total: 0,
  discountCodeUsed: undefined,
  discountAmount: undefined,
  grandTotal: 0,
};

// Array to hold multiple carts (one per user)
export let carts: Cart[] = [];
