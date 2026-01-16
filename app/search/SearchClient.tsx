"use client";

import FilterSidebar from "@/components/product/FilterSidebar";
import ProductCard from "@/components/product/ProductCard";
import { getProductList } from "@/services/product.service";
import { ProductFilterInput, ProductSortInput } from "@/types";
import { ChevronDown, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface SearchClientProps {
  initialProducts: any[];
  initialFilters: ProductFilterInput;
  initialSort: ProductSortInput;
  initialHasNext: boolean;
}

export default function SearchClient({
  initialProducts,
  initialFilters,
  initialSort,
  initialHasNext,
}: SearchClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. State
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasNext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Query State
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilterInput>(initialFilters);
  const [sort, setSort] = useState<ProductSortInput>(initialSort);

  const isInitialMount = useRef(true);

  // 2. Fetch Logic
  const fetchProducts = useCallback(
    async (
      currentPage: number = page,
      currentFilters: ProductFilterInput = filters,
      currentSort: ProductSortInput = sort
    ) => {
      if (loading) return;
      setLoading(true);

      try {
        const productList = await getProductList({
          filter: currentFilters,
          sort: currentSort,
          page: currentPage,
          limit: 15,
        });

        if (currentPage === 1) {
          setProducts(productList.items);
        } else {
          setProducts((prev) => [...prev, ...productList.items]);
        }

        if (!productList.hasNext) setHasMore(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, page, filters, sort]
  );

  // Update URL
  const updateUrl = useCallback(
    (newFilters: ProductFilterInput, newSort: ProductSortInput) => {
      const params = new URLSearchParams(searchParams.toString());

      // Reset keys managed by this page
      params.delete("q");
      params.delete("minPrice");
      params.delete("maxPrice");
      params.delete("cat");
      params.delete("stock");
      params.delete("sortField");
      params.delete("sortDir");

      if (newFilters.search) params.set("q", newFilters.search);
      if (newFilters.minPrice)
        params.set("minPrice", newFilters.minPrice.toString());
      if (newFilters.maxPrice)
        params.set("maxPrice", newFilters.maxPrice.toString());
      if (newFilters.categoryId) params.set("cat", newFilters.categoryId);
      if (newFilters.inStock) params.set("stock", "true");

      if (newSort.field) params.set("sortField", newSort.field);
      if (newSort.direction) params.set("sortDir", newSort.direction);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // 3. Effects
  // Reset when filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setPage(1);
    setHasMore(true);
    fetchProducts(1, filters, sort);
    updateUrl(filters, sort);
  }, [filters, sort]);

  // Infinite Scroll Trigger
  useEffect(() => {
    if (page > 1) fetchProducts(page, filters, sort);
  }, [page]);

  // Observer for Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header / Top Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SlidersHorizontal size={20} className="text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Hasil Pencarian
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                {products.length} Barang
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:block">
                Urutkan berdasarkan:
              </span>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-all shadow-sm">
                  {sort.field === "PRICE"
                    ? "Harga"
                    : sort.field === "NAME"
                    ? "Nama"
                    : "Terbaru"}
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                  <div className="py-1">
                    {[
                      { label: "Terbaru", field: "CREATED_AT", dir: "DESC" },
                      {
                        label: "Harga: Rendah ke Tinggi",
                        field: "PRICE",
                        dir: "ASC",
                      },
                      {
                        label: "Harga: Tinggi ke Rendah",
                        field: "PRICE",
                        dir: "DESC",
                      },
                      { label: "Nama: A-Z", field: "NAME", dir: "ASC" },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          setSort({
                            field: opt.field as any,
                            direction: opt.dir as any,
                          })
                        }
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          sort.field === opt.field && sort.direction === opt.dir
                            ? "text-indigo-600 font-medium bg-indigo-50"
                            : "text-gray-700"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {/* Empty State */}
            {!loading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Produk tidak ditemukan
                </h3>
                <p className="text-gray-500 max-w-sm mt-2">
                  Coba sesuaikan filter atau cari kata kunci lain.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Hapus semua filter
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => {
                if (products.length === index + 1) {
                  return (
                    <div ref={lastElementRef} key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  );
                }
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>

            {/* Loading State / Sentinel */}
            {loading && (
              <div className="py-12 flex justify-center w-full">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
              </div>
            )}

            {!hasMore && products.length > 0 && (
              <div className="py-8 text-center text-sm text-gray-400">
                Anda telah mencapai akhir daftar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
