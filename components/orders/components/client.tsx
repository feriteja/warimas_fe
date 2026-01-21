"use client";

import { OrderStatus } from "@/types";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const CUSTOMER_ORDER_STATUSES = [
  { key: "ALL", label: "Semua" },
  { key: OrderStatus.PENDING_PAYMENT, label: "Menunggu" },
  { key: OrderStatus.PAID, label: "Dibayar" },
  { key: OrderStatus.ACCEPTED, label: "Diproses" },
  { key: OrderStatus.SHIPPED, label: "Dikirim" },
  { key: OrderStatus.COMPLETED, label: "Selesai" },
  { key: OrderStatus.CANCELLED, label: "Dibatalkan" },
];

export function OrderFilters({
  initialSearch,
  initialStatus,
}: {
  initialSearch: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== initialSearch) {
        updateParam("search", search);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, initialSearch]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset page to 1 when filtering changes
    if (key === "search" || key === "status") {
      params.set("page", "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Cari pesanan..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CUSTOMER_ORDER_STATUSES.map((stat) => {
          const isActive = (status || "ALL") === stat.key;
          return (
            <button
              key={stat.key}
              onClick={() => {
                setStatus(stat.key);
                updateParam("status", stat.key);
              }}
              className={`whitespace-nowrap px-4 cursor-pointer py-2 rounded-full text-sm font-medium transition-colors border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {stat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OrderPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 border-t border-gray-200 pt-6">
      <div className="text-sm text-gray-500">
        Halaman <span className="font-medium">{page}</span> dari{" "}
        <span className="font-medium">{totalPages}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
