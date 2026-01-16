import { PageInfo } from "./pagination";
import { ProductCartType } from "./product";

export type CartItemType = {
  id: string;
  userId: number; // int32 → number
  quantity: number; // int32 → number
  product?: ProductCartType;
  createdAt: string; // usually ISO date string
  updatedAt: string;
};

export type ResponseType = {
  success: string;
  message: string;
};

export type AddToCartResponseType = ResponseType & { cartItem: CartItemType };

export enum CartSortField {
  NAME = "NAME",
  PRICE = "PRICE",
  CREATED_AT = "CREATED_AT",
}

export type CartSortInput = {
  field: CartSortField;
  direction: "ASC" | "DESC";
};

export type CartFilterInput = {
  search?: string;
  inStock?: boolean;
};

export type CartListResponse = {
  items: CartItemType[];
  pageInfo: PageInfo;
};
