export interface Discount {
  code: string;
  percentage: number;
}

export let discountCodes: Discount[] = [];
export let usedDiscountCodes: Discount[] = [];
export let discountedTotal: number | null = null;
