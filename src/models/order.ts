import { CartItem } from './cart';

export interface Order {
  orderId: string;
  userId: number;
  items: CartItem[];
  total: number;
  discountCodeUsed?: string;
  discountAmount?: number;
  grandTotal: number;
}

export interface Insights {
  totalOrders: number;
  totalRevenue: number;
  totalCarts: number;
  totalItems: number;
  averageOrderValue: number;
  averageItemsPerCart: number;
  totalDiscountAmount: number;
  totalDiscountCodesUsed: number;
}

export let orders: Order[] = [];
