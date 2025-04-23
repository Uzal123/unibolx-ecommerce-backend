import { Item } from './item';

export interface CartItem extends Item {
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  userId: number | null;
  items: CartItem[];
  total: number;
  discountCodeUsed?: string;
  discountedTotal?: number;
  grandTotal: number;
}

export let cart: Cart = {
  userId: null,
  items: [],
  total: 0,
  discountCodeUsed: undefined,
  discountedTotal: undefined,
  grandTotal: 0,
};

export interface Order {
  orderId: string;
  userId: string;
  items: CartItem[];
  total: number;
  discountCodeUsed?: string;
  discountedTotal?: number;
  grandTotal: number;
}
