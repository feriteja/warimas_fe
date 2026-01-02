import { getCartList } from "@/services/cart.service";
import { useQuery } from "@tanstack/react-query";

export const PAGE_SIZE_PRODUCT_LIST = 20;

export const useCartList = ({
  page,
  limit,
}: {
  page: number;
  limit?: number;
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
