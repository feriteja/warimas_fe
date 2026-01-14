"use client";

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

// --- UI COMPONENT: KARTU KATEGORI ---
const CategoryCard = ({ item }: { item: CategoryItem }) => {
  return (
    <div className="group flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {/* Folder Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            </svg>
          </div>
          <span className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-all duration-300">
            {/* Arrow Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {item.subcategories.slice(0, 3).map((sub) => (
            <span
              key={sub.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100"
            >
              {sub.name}
            </span>
          ))}
          {item.subcategories.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-400">
              +{item.subcategories.length - 3} lainnya
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SKELETON LOADER ---
const SkeletonCard = () => (
  <div className="p-6 bg-white border border-gray-100 rounded-2xl h-64 animate-pulse">
    <div className="w-10 h-10 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="flex gap-2 mt-4">
      <div className="h-5 bg-gray-200 rounded w-16"></div>
      <div className="h-5 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

// --- KOMPONEN UNTUK STATUS ERROR ---
const ErrorState = ({ message }: { message: string }) => (
  <div className="col-span-full mt-10 text-center p-8 bg-red-50 border border-red-200 rounded-2xl">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-3">
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <p className="text-red-700 font-medium mb-4">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
    >
      Coba Lagi
    </button>
  </div>
);

// --- KOMPONEN UTAMA HALAMAN ---

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
