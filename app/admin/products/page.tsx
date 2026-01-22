"use client";

import useDebouncedValue from "@/hooks/useDebouncedValue";
import { PAGE_SIZE_PRODUCT_LIST, useProductList } from "@/hooks/useProduct";
import { updateQuery } from "@/lib/utils";
import { FilterState } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const params = useSearchParams();
  const pageParam = params.get("page");

  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    categoryId: "",
    search: "",
    status: "",
    sellerName: "",
  });

  const [sortBy, setSortBy] = useState<"name" | "createdAt">("createdAt");
  const [page, setPage] = useState(Number(pageParam));

  const debouncedFilters = useDebouncedValue(filters, 500);

  const { data, isLoading, isFetching, error } = useProductList({
    filters: debouncedFilters,
    sortBy,
    page,
  });

  const products = data?.items ?? [];
  const totalItem = data?.totalCount ?? 1;
  const totalPage = Math.ceil(totalItem / PAGE_SIZE_PRODUCT_LIST);
  const hasNext = data?.hasNext;

  const movePage = (nextPage: number) => {
    setPage(nextPage);
    updateQuery(router, params, { page: nextPage });
  };

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      updateQuery(router, params, { page: 1 });
    }
  }, [debouncedFilters, sortBy]);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          placeholder="Search product..."
          className="input"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        <input
          placeholder="Category"
          className="input"
          value={filters.categoryId}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, categoryId: e.target.value }))
          }
        />

        <input
          placeholder="Seller"
          className="input"
          value={filters.sellerName}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sellerName: e.target.value }))
          }
        />

        <select
          className="input"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>

        <select
          className="input"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              inStock:
                e.target.value === "" ? undefined : e.target.value === "true",
            }))
          }
        >
          <option value="">Stock</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <select
          className="input"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="createdAt">Newest</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Seller</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : products?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No products found
                </td>
              </tr>
            ) : (
              <>
                {isFetching && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-2 text-sm text-gray-400"
                    >
                      Updating results…
                    </td>
                  </tr>
                )}
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">{product.categoryName}</td>
                    <td className="px-4 py-3">{product.sellerName}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <button
          disabled={page === 1 || isFetching}
          onClick={() => movePage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          {page} / {totalPage}
        </span>
        <button
          disabled={!hasNext || isFetching}
          onClick={() => movePage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
