import { mapProductFiltersToAPI, mapProductSortToAPI } from "@/lib/utils";
import { getCartList } from "@/services/cart.service";
import { getProductList } from "@/services/product.service";
import { FilterState } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const PAGE_SIZE_PRODUCT_LIST = 20;

export const useCartList = ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  return useQuery({
    queryKey: ["carts", page, limit],
    queryFn: async () => {
      return getCartList({
        limit: PAGE_SIZE_PRODUCT_LIST,
        page: page,
      });
    },

    placeholderData: (previousData) => previousData, // v5 equivalent
    staleTime: 60_000,
  });
};
