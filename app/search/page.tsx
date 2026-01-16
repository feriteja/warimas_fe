import { getProductList } from "@/services/product.service";
import { ProductSortField, SortDirection } from "@/types";
import SearchClient from "./SearchClient";

// --- Main Page Component (Server) ---

export default async function SearchPage({
  searchParams: rawSearchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await rawSearchParams;
  // Parse params
  const search =
    typeof searchParams.q === "string" ? searchParams.q : undefined;
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? Number(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string"
      ? Number(searchParams.maxPrice)
      : undefined;
  const categoryId =
    typeof searchParams.cat === "string" ? searchParams.cat : undefined;
  const inStock = searchParams.stock === "true";

  const sortField =
    typeof searchParams.sortField === "string"
      ? searchParams.sortField
      : ProductSortField.NAME;
  const sortDir =
    typeof searchParams.sortDir === "string" ? searchParams.sortDir : "ASC";

  const filters = {
    search,
    minPrice,
    maxPrice,
    categoryId,
    inStock,
  };

  const sort = {
    field: sortField as ProductSortField,
    direction: sortDir as SortDirection,
  };

  // Fetch initial data
  const initialData = await getProductList({
    filter: filters, //
    sort,
    page: 1,
    limit: 15,
  });

  return (
    <SearchClient
      initialProducts={initialData.items}
      initialFilters={filters}
      initialSort={sort}
      initialHasNext={initialData.hasNext}
    />
  );
}
