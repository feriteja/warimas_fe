import { graphqlFetch } from "@/lib/graphql/fetcher";
import { ADD_CATEGORY, ADD_SUB_CATEGORY } from "@/lib/graphql/mutations";
import { GET_CATEGORY, GET_SUB_CATEGORY } from "@/lib/graphql/queries";
import { CategoryData, SubCategoryData } from "@/types";

/* ----------------------------------
 * Category Mutations
 * ---------------------------------- */

/**
 * mutation AddCategory($name: String!)
 */
export async function addCategory(
  name: string
): Promise<{ id: string; name: string }> {
  return graphqlFetch<
    { addCategory: { id: string; name: string } },
    { name: string }
  >(ADD_CATEGORY, {
    variables: { name },
    cache: "no-store",
  }).then((res) => res.addCategory);
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

export async function getCategory({
  name,
  limit,
  page,
}: {
  name?: string;
  limit?: number;
  page?: number;
}): Promise<CategoryData> {
  const res = await graphqlFetch<
    { category: CategoryData },
    { filter?: string; limit?: number; page?: number }
  >(GET_CATEGORY, {
    variables: { filter: name, limit, page },
    cache: "force-cache",
  });

  return res.category;
}

/**
 * query GetSubCategory($name: String!, $categoryID: ID!)
 */
export async function getSubCategory({
  name,
  categoryId,
  limit,
  page,
}: {
  name: string;
  categoryId: string;
  limit: number;
  page: number;
}): Promise<SubCategoryData> {
  const res = await graphqlFetch<
    { subcategory: SubCategoryData },
    { categoryId: string; filter?: string; limit?: number; page?: number }
  >(GET_SUB_CATEGORY, {
    variables: { categoryId, filter: name, limit, page },
    cache: "force-cache",
  });

  return res.subcategory;
}
