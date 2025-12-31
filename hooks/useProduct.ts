import { mapProductFiltersToAPI, mapProductSortToAPI } from "@/lib/utils";
import { getProductList } from "@/services/product.service";
import { FilterState } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const PAGE_SIZE_PRODUCT_LIST = 20;

export const useProductList = ({
  filters,
  sortBy,
  page,
}: {
  filters: FilterState;
  sortBy: "name" | "createdAt";
  page: number;
}) => {
  return useQuery({
    queryKey: ["Products", filters, sortBy, page],
    queryFn: async () => {
      const filter = mapProductFiltersToAPI(filters);
      const sort = mapProductSortToAPI(sortBy);

      return getProductList({
        filter,
        sort,
        limit: PAGE_SIZE_PRODUCT_LIST,
        page: page,
      });
    },

    placeholderData: (previousData) => previousData, // v5 equivalent
    staleTime: 30_000,
  });
};

// export const useProductDetail = (id: string) => {
//   return useQuery({
//     queryKey: ["ProductDetauk", id],
//     queryFn: async () => {
//       return getProductDetail(id);
//     },

//     placeholderData: (previousData) => previousData, // v5 equivalent
//     staleTime: 1000 * 60 * 60, // 1 hour
//   });
// };
