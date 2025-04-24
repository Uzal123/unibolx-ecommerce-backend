import { HttpError } from '../libs/httpError';
import { errorHandler } from '../libs/errorHandler';
import { Cart, carts } from '../models/cart';
import { items } from '../models/item';
import discountService from './discountService';

/**
 * Creates a new cart for a user if one doesn't already exist.
 * May also attach a discount code if the user qualifies.
 *
 * @param userId - The ID of the user creating a cart.
 * @returns The new or existing cart object.
 */
const createCart = (userId: number): Cart => {
  const discountCode = discountService.createDiscountCodeForUser(userId);

  const existingCart = getCartByUserId(userId);
  if (existingCart) {
    return existingCart;
  }

  const newCart: Cart = {
    userId,
    items: [],
    total: 0,
    discountCodeUsed: undefined,
    discountAmount: undefined,
    availableDiscountCodes: discountCode ? [discountCode] : undefined,
    grandTotal: 0,
  };

  carts.push(newCart);
  return newCart;
};

/**
 * Retrieves a cart by user ID.
 *
 * @param userId - The ID of the user.
 * @returns The cart object or undefined if not found.
 */
const getCartByUserId = (userId: number): Cart | undefined => {
  return carts.find((cart) => cart.userId === userId);
};

/**
 * Adds an item to a user's cart. If the item exists, updates quantity and total.
 *
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item to add.
 * @param quantity - Quantity of the item to add.
 * @throws HttpError if item not found.
 * @returns Updated cart object.
 */
const addItemToCart = (
  userId: number,
  itemId: number,
  quantity: number,
): Cart => {
  let userCart = getCartByUserId(userId);
  if (!userCart) {
    userCart = createCart(userId);
  }

  const item = items.find((item) => item.id === itemId);
  if (!item) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Item not found',
      code: 400,
    });
  }

  // Re-check for applicable discount code
  const discountCode = discountService.createDiscountCodeForUser(userId);
  userCart.availableDiscountCodes = discountCode ? [discountCode] : undefined;

  const existingItemIndex = userCart.items.findIndex(
    (cartItem) => cartItem.id === itemId,
  );

  const itemTotal = item.price * quantity;

  if (existingItemIndex !== -1) {
    // Update existing item in cart
    const existingItem = userCart.items[existingItemIndex];
    existingItem.quantity += quantity;
    existingItem.totalPrice = existingItem.quantity * item.price;
  } else {
    // Add new item to cart
    userCart.items.push({
      ...item,
      quantity,
      totalPrice: itemTotal,
    });
  }

  userCart.total += itemTotal;
  userCart.grandTotal = userCart.total;

  return userCart;
};

/**
 * Removes a specified quantity of an item from the user's cart.
 * Removes the item entirely if quantity reaches zero.
 *
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item to remove.
 * @param quantity - Quantity of the item to remove.
 * @throws HttpError if item not found in cart or quantity exceeds available.
 * @returns Updated cart object.
 */
const removeItemFromCart = (
  userId: number,
  itemId: number,
  quantity: number,
): Cart => {
  const userCart = getCartByUserId(userId);
  if (!userCart) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Cart not found',
      code: 400,
    });
  }

  const itemIndex = userCart.items.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Item not found in cart',
      code: 400,
    });
  }

  const item = userCart.items[itemIndex];

  if (item.quantity > quantity) {
    // Decrease quantity and recalculate price
    item.quantity -= quantity;
    item.totalPrice = item.quantity * item.price;
    userCart.total -= item.price * quantity;
  } else if (item.quantity === quantity) {
    // Remove item entirely
    userCart.items.splice(itemIndex, 1);
    userCart.total -= item.price * quantity;
  } else {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Quantity exceeds available stock',
      code: 400,
    });
  }

  userCart.grandTotal = userCart.total;

  return userCart;
};

// Export service methods
const cartService = {
  createCart,
  addItemToCart,
  removeItemFromCart,
  getCartByUserId,
};

export default cartService;
