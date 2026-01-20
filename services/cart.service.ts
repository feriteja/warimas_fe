import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  ADD_TO_CART,
  DELETE_CART_LIST,
  UPDATE_CART_LIST,
} from "@/lib/graphql/mutation/cart.mutation";

import { GET_CART_COUNT, GET_CART_LIST } from "@/lib/graphql/query/cart.query";
import {
  AddToCartResponseType,
  CartItemType,
  CartListResponse,
  CartSortField,
  CartSortInput,
} from "@/types/cart";

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

export async function getCartList({
  page = 1,
  limit = 15,
}: {
  page?: number;
  limit?: number;
}): Promise<CartListResponse> {
  const res = await graphqlFetch<
    { myCart: CartListResponse },
    { page?: number; limit: number; sort: CartSortInput }
  >(GET_CART_LIST, {
    variables: {
      page,
      limit,
      sort: { field: CartSortField.CREATED_AT, direction: "DESC" },
    },
    cache: "no-store",
  });

  return res.myCart;
}

export async function updateCartList({
  variantId,
  quantity,
}: {
  variantId: string;
  quantity: number;
}): Promise<{ success: boolean }> {
  console.log("dipanggil");

  console.log({ variantId, quantity });

  return graphqlFetch<{ updateCart: { success: boolean } }>(UPDATE_CART_LIST, {
    variables: { variantId, quantity },
    cache: "no-store",
  }).then((res) => res.updateCart);
}

export async function deleteCartList({
  variantIds,
}: {
  variantIds: string[];
}): Promise<{ success: boolean }> {
  return graphqlFetch<{ removeFromCart: { success: boolean } }>(
    DELETE_CART_LIST,
    {
      variables: { variantIds },
      cache: "no-store",
    },
  ).then((res) => res.removeFromCart);
}

export async function getCartCount({
  cookieHeader,
}: {
  cookieHeader?: string;
}) {
  return graphqlFetch<{}, { myCartCount: number }>(GET_CART_COUNT, {
    cache: "no-store",
    cookieHeader: cookieHeader,
  });
}
