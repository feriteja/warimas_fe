import { ProductFilterInput } from "./filter";
import { ProductSortInput } from "./sort";
import type { VariantType } from "./variant";

// This serves as the single source of truth for a Product's core data
export interface IBaseProduct {
  id: string;
  name: string;
  sellerId: string;
  sellerName: string;
  categoryID: string;
  categoryName: string;
  subcategoryID: string;
  subcategoryName: string;
  imageUrl: string | null;
  description: string;
  status: "active" | "disabled" | string;
  createdAt: string;
  updatedAt: string;
}

// Standard Product with multiple variants
export interface ProductType extends IBaseProduct {
  variants: VariantType[];
  slug?: string; // Optional if not always present in API
}

// Cart Product specifically holds one selected variant
export interface ProductCartType extends IBaseProduct {
  variant: VariantType;
  slug: string;
}

export interface ProductList {
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  items: ProductType[]; // Uses the consolidated ProductType
}

export interface ProductsHome {
  categoryName: string;
  categorySlug: string;
  products: ProductType[];
}

export interface ProductsHomeListType {
  productsHome: ProductsHome[];
}

// Creating a product usually requires fewer fields
export type CreateProductInput = {
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  description?: string;
  categoryId: string;
};

export interface FilterState {
  categoryId: string;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  inStock?: boolean;
  status: string;
  sellerName: string;
}

export type PaginationVars = {
  filter?: ProductFilterInput;
  sort?: ProductSortInput;
  limit?: number;
  page?: number;
};
