import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  ADD_CATEGORY,
  ADD_SUB_CATEGORY,
  ADD_TO_CART,
} from "@/lib/graphql/mutations";
import { GET_CATEGORY, GET_SUB_CATEGORY } from "@/lib/graphql/queries";
import { AddToCartResponseType } from "@/types/cart";

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

/**
 * mutation AddSubCategory($categoryID: ID!, $name: String!)
 */
export async function addSubCategory(
  categoryID: string,
  name: string
): Promise<{ id: string; name: string }> {
  return graphqlFetch<
    { addSubCategory: { id: string; name: string } },
    { categoryID: string; name: string }
  >(ADD_SUB_CATEGORY, {
    variables: { categoryID, name },
    cache: "no-store",
  }).then((res) => res.addSubCategory);
}

/* ----------------------------------
 * Types
 * ---------------------------------- */

type Category = {
  id: string;
  name: string;
};

type GetCategoryResponse = {
  category: Category[];
};

type GetSubCategoryResponse = {
  subCategory: Category[];
};

/* ----------------------------------
 * Queries
 * ---------------------------------- */

/**
 * query GetCategory($name: String!)
 */
export async function getCategoryByName(name: string): Promise<Category[]> {
  const res = await graphqlFetch<GetCategoryResponse, { name: string }>(
    GET_CATEGORY,
    {
      variables: { name },
      cache: "force-cache",
    }
  );

  return res.category;
}

/**
 * query GetSubCategory($name: String!, $categoryID: ID!)
 */
export async function getSubCategoryByName(
  name: string,
  categoryID: string
): Promise<Category[]> {
  const res = await graphqlFetch<
    GetSubCategoryResponse,
    { name: string; categoryID: string }
  >(GET_SUB_CATEGORY, {
    variables: { name, categoryID },
    cache: "force-cache",
  });

  return res.subCategory;
}
