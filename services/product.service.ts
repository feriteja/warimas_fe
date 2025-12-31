import { graphqlFetch } from "@/lib/graphql/fetcher";
import { ADD_PRODUCT, ADD_PRODUCT_VARIANT } from "@/lib/graphql/mutations";
import {
  ADMIN_GET_PRODUCT_LIST,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_HOME_LIST,
} from "@/lib/graphql/queries";
import {
  CreateProductInput,
  CreateProductVariantInput,
  ProductFilterInput,
  ProductsHomeListType,
  ProductSortInput,
  ProductType,
  VariantType,
} from "@/types";

/* ----------------------------------
 * Shared Types
 * ---------------------------------- */

type PaginationVars = {
  filter?: ProductFilterInput;
  sort?: ProductSortInput;
  limit?: number;
  page?: number;
};

type ProductListResponse = {
  productList: {
    page: number;
    limit: number;
    totalCount: number;
    hasNext: boolean;
    items: ProductType[];
  };
};

/* ----------------------------------
 * Product Mutations
 * ---------------------------------- */

/**
 * mutation AddProduct($input: NewProduct!)
 */
export async function addProduct(
  input: CreateProductInput
): Promise<ProductType> {
  return graphqlFetch<
    { createProduct: ProductType },
    { input: CreateProductInput }
  >(ADD_PRODUCT, {
    variables: { input },
    cache: "no-store",
  }).then((res) => res.createProduct);
}

/**
 * mutation CreateVariants($input: [NewVariant!]!)
 */
export async function addProductVariants(
  input: CreateProductVariantInput[]
): Promise<VariantType[]> {
  return graphqlFetch<
    { createVariants: VariantType[] },
    { input: CreateProductVariantInput[] }
  >(ADD_PRODUCT_VARIANT, {
    variables: { input },
    cache: "no-store",
  }).then((res) => res.createVariants);
}

/* ----------------------------------
 * Admin Queries
 * ---------------------------------- */

/**
 * query productList(...)
 */
export async function getProductList(
  vars: PaginationVars
): Promise<ProductListResponse> {
  return graphqlFetch<ProductListResponse, PaginationVars>(
    ADMIN_GET_PRODUCT_LIST,
    {
      variables: {
        limit: 20,
        page: 0,
        ...vars,
      },
      cache: "no-store", // admin data should not be cached
    }
  );
}

/* ----------------------------------
 * Public Queries
 * ---------------------------------- */

/**
 * query productsHome
 * (no variables)
 */
export async function getProductHomeList(): Promise<ProductsHomeListType> {
  return graphqlFetch<ProductsHomeListType>(GET_PRODUCT_HOME_LIST, {
    cache: "force-cache",
  });
}

export async function getProductDetail({
  id,
  cookieHeader,
}: {
  id: string;
  cookieHeader?: string;
}): Promise<{ productDetail: ProductType }> {
  return graphqlFetch<{ productDetail: ProductType }>(GET_PRODUCT_DETAIL, {
    cache: "force-cache",
    variables: { productID: id },
    cookieHeader: cookieHeader,
  });
}
