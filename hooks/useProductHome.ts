import { mapProductSortToAPI } from "@/lib/utils";
import { getProductHomeList } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const PAGE_SIZE_PRODUCT_LIST = 20;

export const useProductHomeList = ({
  sortBy = "name",
  page = 1,
}: {
  sortBy?: "name" | "createdAt";
  page?: number;
}) => {
  return useQuery({
    queryKey: ["ProductsHome", sortBy, page],
    queryFn: async () => {
      const sort = mapProductSortToAPI(sortBy);

      return getProductHomeList();
    },

    placeholderData: (previousData) => previousData,
    staleTime: 1_000 * 60 * 60, // 1 hour
  });
};
