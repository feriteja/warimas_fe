export type ProductFilterInput = {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  inStock?: boolean;
  status?: string;
  sellerName?: string;
};
