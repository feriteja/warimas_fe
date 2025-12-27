import type { QuantityType } from "./quantity";

export type VariantType = {
  id?: string;
  productId?: string;
  name: string;
  quantityType: QuantityType;
  stock: number;
  price: number;
};

export type CreateProductVariantInput = {
  productId: string;
  subcategoryId: string;
  quantityType: QuantityType;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  description?: string;
};
