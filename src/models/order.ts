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

export let orders: Order[] = [];
