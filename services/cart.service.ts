import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  ADD_CATEGORY,
  ADD_SUB_CATEGORY,
  ADD_TO_CART,
} from "@/lib/graphql/mutations";
import {
  GET_CART_LIST,
  GET_CATEGORY,
  GET_SUB_CATEGORY,
} from "@/lib/graphql/queries";
import { CategoryType } from "@/types";
import { AddToCartResponseType, CartItemType } from "@/types/cart";

/* ----------------------------------
 * Category Mutations
 * ---------------------------------- */

/**
 * mutation AddCategory($name: String!)
 */
export async function addToCart({
  variantId,
  quantity,
}: {
  variantId: string;
  quantity: number;
}): Promise<AddToCartResponseType> {
  return graphqlFetch<{ addToCart: AddToCartResponseType }>(ADD_TO_CART, {
    variables: { variantId, quantity },
    cache: "no-store",
  }).then((res) => res.addToCart);
}

/* ----------------------------------
 * Types
 * ---------------------------------- */

type getCartListResponse = {
  myCart: CartItemType[];
};

/* ----------------------------------
 * Queries
 * ---------------------------------- */

/**
 * query GetCategory($name: String!)
 */
export async function getCartList({
  page = 1,
  limit = 15,
}: {
  page?: number;
  limit: number;
}): Promise<CartItemType[]> {
  const res = await graphqlFetch<
    getCartListResponse,
    { page?: number; limit: number }
  >(GET_CART_LIST, {
    variables: { page, limit },
    cache: "force-cache",
  });

  return res.myCart;
}
