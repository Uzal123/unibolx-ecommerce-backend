import { HttpError } from '../libs/httpError';
import { errorHandler } from '../libs/errorHandler';
import { Cart, carts } from '../models/cart';
import { items } from '../models/item';
import discountService from './discountService';

const createCart = (userId: number): Cart => {
  const discountCode = discountService.createDiscountCodeForUser(userId);
  // Check if the cart already exists for the user
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

const getCartByUserId = (userId: number): Cart | undefined => {
  const cart = carts.find((cart) => cart.userId === userId);
  if (!cart) {
    return undefined;
  }
  return cart;
};

const addItemToCart = (
  userId: number,
  itemId: number,
  quantity: number,
): Cart => {
  // Ensure a cart exists
  let userCart = getCartByUserId(userId);
  if (!userCart) {
    userCart = createCart(userId);
  }

  // Find item to add
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Item not found',
      code: 400,
    });
  }

  // show discount code if available
  const discountCode = discountService.createDiscountCodeForUser(userId);
  userCart.availableDiscountCodes = discountCode ? [discountCode] : undefined;

  // Check if item already exists in cart
  const existingItemIndex = userCart.items.findIndex(
    (cartItem) => cartItem.id === itemId,
  );

  const itemTotal = item.price * quantity;

  if (existingItemIndex !== -1) {
    // Update existing item quantity and price
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

  // Update cart totals
  userCart.total += itemTotal;
  userCart.grandTotal = userCart.total;

  return userCart;
};

const removeItemFromCart = (
  userId: number,
  itemId: number,
  quantity: number,
): Cart => {
  // Ensure a cart exists
  let userCart = getCartByUserId(userId);
  if (!userCart) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Cart not found',
      code: 400,
    });
  }
  // Find item to remove
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
    item.quantity -= quantity;
    item.totalPrice = item.quantity * item.price;
    userCart.total -= item.price * quantity;
  } else if (item.quantity === quantity) {
    userCart.items.splice(itemIndex, 1);
    userCart.total -= item.price * quantity;
  } else {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Quantity exceeds available stock',
      code: 400,
    });
  }
  // Update cart totals
  userCart.grandTotal = userCart.total;
  return userCart;
};

const cartService = {
  createCart,
  addItemToCart,
  removeItemFromCart,
  getCartByUserId,
};

export default cartService;
