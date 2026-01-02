import type { VariantType } from "./variant";

export interface ProductType {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  slug: string;
  sellerId: string;
  sellerName: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  variants: VariantType[];
}
export interface ProductCartType {
  id: string;
  name: string;
  sellerId: string;
  sellerName: string;
  categoryID: string;
  categoryName: string;
  subcategoryID: string;
  subcategoryName: string;
  slug: string;
  variant: VariantType;
  imageUrl: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface ProductsHomeListType {
  productsHome: ProductsHome[];
}

export interface ProductsHome {
  CategoryName: string;
  Products: ProductType[];
}
