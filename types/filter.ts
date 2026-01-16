export type ProductFilterInput = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  inStock?: boolean;
  status?: string;
  sellerName?: string;
};
