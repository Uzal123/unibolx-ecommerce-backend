import { carts } from '../models/cart';
import { orders } from '../models/order';
import discountService from './discountService';

const getInsights = () => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.grandTotal, 0);
  const totalCarts = carts.length;
  const totalItems = carts.reduce((acc, cart) => acc + cart.items.length, 0);
  const averageOrderValue = totalRevenue / totalOrders || 0;
  const averageItemsPerCart = totalItems / totalCarts || 0;
  const totalDiscountAmount = orders.reduce(
    (acc, order) => acc + (order.discountAmount || 0),
    0,
  );
  const totalDiscountCodesUsed = orders.filter(
    (order) => order.discountCodeUsed,
  ).length;
  const discountCodes = discountService.getDiscountCodes();
  const totalDiscountCodes = discountCodes.length;
  const insights = {
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
  return insights;
};

const createDiscountCode = (percentage: number) => {
  const discountCode = discountService.createDiscountCode(percentage);
  return discountCode;
};

const adminService = {
  getInsights,
  createDiscountCode,
};

export default adminService;
