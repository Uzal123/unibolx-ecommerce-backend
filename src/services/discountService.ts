import { HttpError } from '../libs/httpError';
import { Cart, carts } from '../models/cart';
import { Discount, discountCodes, usedDiscountCodes } from '../models/discount';
import { orders } from '../models/order';
import cartService from './cartService';
import config from '../config/config';

const createDiscountCodeForUser = (userId: number): Discount | undefined => {
  const userOrders = orders.filter((order) => order.userId === userId);
  if (
    userOrders.length % config.discountFrequency !== 0 ||
    userOrders.length === 0
  ) {
    return undefined;
  }
  const discountCode = {
    code: `DISCOUNT-${userId}-${Date.now()}`,
    percentage: 10,
  };
  discountCodes.push(discountCode);
  return discountCode;
};

const createDiscountCode = (percentage: number): Discount => {
  const discountCode = {
    code: `DISCOUNT-${Date.now()}`,
    percentage,
  };
  discountCodes.push(discountCode);
  return discountCode;
};

const applyDiscountCode = (userId: number, discountCode: string): Cart => {
  // Find the user's cart
  const userCart = cartService.getCartByUserId(userId);
  if (!userCart) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Cart not found',
      code: 400,
    });
  }

  // Check if the discount code is valid
  const discount = discountCodes.find((code) => code.code === discountCode);
  if (!discount) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Invalid discount code',
      code: 400,
    });
  }

  // Apply the discount to the cart total
  userCart.discountAmount = (userCart.total * discount.percentage) / 100;
  userCart.discountCodeUsed = discountCode;
  userCart.grandTotal = userCart.total - userCart.discountAmount;
  discountCodes.splice(discountCodes.indexOf(discount), 1);
  usedDiscountCodes.push(discount);

  return userCart;
};

const removeDiscountCode = (userId: number, discountCode: string): Cart => {
  // Find the user's cart
  const userCart = cartService.getCartByUserId(userId);
  if (!userCart) {
    throw new HttpError({
      type: 'BAD_REQUEST',
      message: 'Cart not found',
      code: 400,
    });
  }
  // Remove the discount code from the cart
  userCart.discountCodeUsed = undefined;
  userCart.availableDiscountCodes = [{ code: discountCode, percentage: 10 }];
  userCart.discountAmount = undefined;
  userCart.grandTotal = userCart.total;
  discountCodes.push({
    code: discountCode,
    percentage: 10,
  });
  usedDiscountCodes.splice(
    usedDiscountCodes.indexOf({
      code: discountCode,
      percentage: 10,
    }),
    1,
  );
  return userCart;
};

const getDiscountCodes = (): Discount[] => {
  return discountCodes;
};

const discountService = {
  createDiscountCodeForUser,
  createDiscountCode,
  applyDiscountCode,
  removeDiscountCode,
  getDiscountCodes,
};
export default discountService;
