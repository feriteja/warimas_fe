import { ProductCartType, ProductType } from "./product";

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
