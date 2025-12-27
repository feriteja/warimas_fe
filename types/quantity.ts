export const quantityTypes = ["kg", "liter", "sack", "unit"] as const;

export type QuantityType = (typeof quantityTypes)[number];
