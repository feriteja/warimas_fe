import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_VARIANT,
  ADMIN_GET_PRODUCT_LIST,
} from "@/lib/graphql/mutations";
import {
  CreateProductInput,
  CreateProductVariantInput,
  ProductFilterInput,
  ProductSortInput,
  ProductType,
  VariantType,
} from "@/types";

export async function addProduct(input: CreateProductInput) {
  return graphqlFetch<ProductType>(ADD_PRODUCT, { input });
}

export async function addProductVariants(input: CreateProductVariantInput[]) {
  return graphqlFetch<VariantType[]>(ADD_PRODUCT_VARIANT, { input });
}

type getProductListProps = {
  filter?: ProductFilterInput;
  sort?: ProductSortInput;
  limit?: number;
  page?: number;
};
export async function getProductList({
  filter,
  sort,
  limit = 20,
  page = 0,
}: getProductListProps) {
  return graphqlFetch<{
    productList: { items: ProductType[]; totalCount: number; hasNext: boolean };
  }>(ADMIN_GET_PRODUCT_LIST, {
    filter,
    sort,
    limit,
    page,
  });
}
