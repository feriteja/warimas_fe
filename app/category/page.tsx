"use client";

import CategoryCard from "@/components/category/CategoryCard";
import ErrorState from "@/components/category/Error";
import SkeletonCard from "@/components/category/Skeleton";
import { getCategory } from "@/services/category.service";
import { CategoryData, CategoryItem } from "@/types";
import React, { useState, useEffect, useRef, useCallback } from "react";

const fetchCategory = async (page: number): Promise<CategoryData> => {
  try {
    const data = await getCategory({ page });
    if (!data) {
      // Memastikan kita selalu memberikan error jika API tidak mengembalikan data
      throw new Error("Tidak ada data yang diterima dari server.");
    }
    return data;
  } catch (error) {
    console.error("Gagal mengambil kategori:", error);
    // Melempar kembali error agar bisa ditangkap oleh logika komponen
    throw error;
  }
};

export default function CategoryPage() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref for the intersection observer (infinite scroll trigger)
  const observer = useRef<IntersectionObserver | null>(null);

  // The callback reference for the last element in the list
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !error) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, error]
  );

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const { items: newItems, pageInfo } = await fetchCategory(page);

        setItems((prev) => [...prev, ...newItems]);
        setHasMore(pageInfo.hasNextPage);
      } catch (error) {
        console.error("Gagal memuat kategori", error);
        setError("Gagal memuat kategori. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [page]);

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kategori Produk
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl">
            Jelajahi katalog lengkap kami untuk kebutuhan rumah tangga dan
            peralatan.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Tampilkan status error jika ada dan belum ada item */}
          {error && items.length === 0 && <ErrorState message={error} />}

          {items.map((item, index) => {
            // Attach ref to the last item to trigger load more
            if (items.length === index + 1) {
              return (
                <div ref={lastElementRef} key={item.id}>
                  <CategoryCard item={item} />
                </div>
              );
            } else {
              return <CategoryCard key={item.id} item={item} />;
            }
          })}

          {/* Tampilkan skeleton hanya saat memuat dan tidak ada error */}
          {loading && !error && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>

        {/* Tampilkan error di bagian bawah daftar */}
        {error && items.length > 0 && (
          <div className="mt-8">
            <ErrorState message={error} />
          </div>
        )}

        {/* End of List State */}
        {!hasMore && !loading && !error && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="text-gray-500">Anda telah mencapai akhir daftar.</p>
          </div>
        )}
      </div>
    </main>
  );
}
