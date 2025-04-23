import { Discount } from './discount';
import { Item } from './item';

export interface CartItem extends Item {
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  userId: number | null;
  items: CartItem[];
  total: number;
  availableDiscountCodes?: Discount[];
  discountCodeUsed?: string;
  discountAmount?: number;
  grandTotal: number;
}

export let cart: Cart = {
  userId: null,
  items: [],
  total: 0,
  discountCodeUsed: undefined,
  discountAmount: undefined,
  grandTotal: 0,
};

export let carts: Cart[] = [];
