import { HttpError } from '../libs/httpError';
import { Cart, carts } from '../models/cart';
import { Discount, discountCodes, usedDiscountCodes } from '../models/discount';
import { orders } from '../models/order';
import cartService from './cartService';
import config from '../config/config';

/**
 * Automatically generates a discount code for a user
 * when the number of orders they’ve placed is a multiple of the configured frequency.
 *
 * @param userId - The ID of the user eligible for a discount.
 * @returns The generated discount code or undefined if not eligible.
 */
const createDiscountCodeForUser = (userId: number): Discount | undefined => {
  const userOrders = orders.filter((order) => order.userId === userId);

  // Only create a discount code if order count is a multiple of the configured frequency
  if (
    userOrders.length % config.discountFrequency !== 0 ||
    userOrders.length === 0
  ) {
    return undefined;
  }

  const discountCode: Discount = {
    code: `DISCOUNT-${userId}-${Date.now()}`,
    percentage: 10,
  };

  discountCodes.push(discountCode);
  return discountCode;
};

/**
 * Manually creates a discount code with a custom percentage.
 *
 * @param percentage - Discount percentage to be applied.
 * @returns The newly created discount code object.
 */
const createDiscountCode = (percentage: number): Discount => {
  const discountCode: Discount = {
    code: `DISCOUNT-${Date.now()}`,
    percentage,
  };

  discountCodes.push(discountCode);
  return discountCode;
};

/**
 * Applies a discount code to the user's cart.
 *
 * @param userId - The ID of the user applying the code.
 * @param discountCode - The code to apply.
 * @throws HttpError if the cart is not found or code is invalid.
 * @returns Updated Cart object with discount applied.
 */
const applyDiscountCode = (userId: number, discountCode: string): Cart => {
  const userCart = cartService.getCartByUserId(userId);

  if (!userCart) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Cart not found',
      code: 400,
    });
  }

  const discount = discountCodes.find((code) => code.code === discountCode);
  if (!discount) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Invalid discount code',
      code: 400,
    });
  }

  // Calculate discount and update cart values
  userCart.discountAmount = (userCart.total * discount.percentage) / 100;
  userCart.discountCodeUsed = discountCode;
  userCart.grandTotal = userCart.total - userCart.discountAmount;

  // Remove discount from active list and store it as used
  discountCodes.splice(discountCodes.indexOf(discount), 1);
  usedDiscountCodes.push(discount);

  return userCart;
};

/**
 * Removes a discount code from the user's cart and restores the original totals.
 *
 * @param userId - The ID of the user removing the code.
 * @param discountCode - The code to remove.
 * @returns Updated Cart object without discount.
 */
const removeDiscountCode = (userId: number, discountCode: string): Cart => {
  const userCart = cartService.getCartByUserId(userId);

  if (!userCart) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Cart not found',
      code: 400,
    });
  }

  // Reset discount fields
  userCart.discountCodeUsed = undefined;
  userCart.discountAmount = undefined;
  userCart.grandTotal = userCart.total;

  // Optionally, return the discount code to the available list
  userCart.availableDiscountCodes = [{ code: discountCode, percentage: 10 }];
  discountCodes.push({ code: discountCode, percentage: 10 });

  // Remove it from used discount codes list
  usedDiscountCodes.splice(
    usedDiscountCodes.findIndex((d) => d.code === discountCode),
    1,
  );

  return userCart;
};

/**
 * Retrieves all currently available discount codes.
 *
 * @returns An array of available discount codes.
 */
const getDiscountCodes = (): Discount[] => {
  return discountCodes;
};

// Export the service object
const discountService = {
  createDiscountCodeForUser,
  createDiscountCode,
  applyDiscountCode,
  removeDiscountCode,
  getDiscountCodes,
};

export default discountService;
