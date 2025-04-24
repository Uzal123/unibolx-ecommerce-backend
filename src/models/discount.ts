/**
 * Represents a discount code with a unique code and a discount percentage.
 */
export interface Discount {
  code: string; // Unique discount code (e.g., "DISCOUNT-12345")
  percentage: number; // Discount percentage (e.g., 10 for 10% off)
}

// Array to store all active discount codes
export let discountCodes: Discount[] = [];

// Array to store used discount codes, ensuring they are not reused
export let usedDiscountCodes: Discount[] = [];

// Stores the total discount applied to a cart, or null if no discount is applied
export let discountedTotal: number | null = null;
