import { graphqlFetch } from "@/lib/graphql/fetcher";
import { ADD_CATEGORY, ADD_SUB_CATEGORY } from "@/lib/graphql/mutations";
import { GET_CATEGORY, GET_SUB_CATEGORY } from "@/lib/graphql/queries";

export async function addCategory(name: string) {
  return graphqlFetch<{
    addCategory: { id: string; name: string };
  }>(ADD_CATEGORY, { name });
}

export async function addSubCategory(categoryID: string, name: string) {
  return graphqlFetch<{
    addSubCategory: { id: string; name: string };
  }>(ADD_SUB_CATEGORY, { categoryID, name });
}

type categoryResponse = { category: { id: string; name: string }[] };
export async function getCategories(name?: string) {
  return graphqlFetch<categoryResponse>(GET_CATEGORY, { name: name || "" });
}

export async function getSubCategories(categoryID: string, name?: string) {
  return graphqlFetch<{
    subCategory: { id: string; categoryID: string; name: string }[];
  }>(GET_SUB_CATEGORY, { categoryID, name: name || "" });
}
