import { graphqlFetch } from "@/lib/graphql/fetcher";
import { ADD_PRODUCT, ADD_PRODUCT_VARIANT } from "@/lib/graphql/mutations";

export async function addProduct(input: CreateProductInput) {
  return graphqlFetch<{ createProduct: ProductType }>(ADD_PRODUCT, { input });
}

export async function addProductVariants(input: CreateProductVariantInput[]) {
  return graphqlFetch<{ createVariants: VariantInputType[] }>(
    ADD_PRODUCT_VARIANT,
    { input }
  );
}
