"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";

const SORT_OPTIONS = [
  { key: "name", label: "Nama" },
  { key: "price", label: "Harga" },
  { key: "stock", label: "Stok" },
  { key: "created_at", label: "Tanggal dibuat" },
  { key: "rate", label: "Rating" },
  { key: "status", label: "Status" },
];

const MOCK_PRODUCTS = [
  {
    id: "P001",
    name: "Indomie Goreng",
    price: 3500,
    seller: "Warimas Official",
    img: "/noimage.jpg",
    stock: 120,
    status: "active",
  },
  {
    id: "P002",
    name: "Beras Ramos 5kg",
    price: 65000,
    seller: "Toko Sejahtera",
    img: "/noimage.jpg",
    stock: 20,
    status: "hidden",
  },
  {
    id: "P003",
    name: "Minyak Goreng 1L",
    price: 15000,
    seller: "Warung Barokah",
    img: "/noimage.jpg",
    stock: 0,
    status: "blocked",
  },
  {
    id: "P004",
    name: "Minyak Goreng 1L",
    price: 15000,
    seller: "Warung Barokah",
    img: "/noimage.jpg",
    stock: 0,
    status: "blocked",
  },
  {
    id: "P005",
    name: "Minyak Goreng 1L",
    price: 15000,
    seller: "Warung Barokah",
    img: "/noimage.jpg",
    stock: 0,
    status: "blocked",
  },
  {
    id: "P006",
    name: "Minyak Goreng 1L",
    price: 15000,
    seller: "Warung Barokah",
    img: "/noimage.jpg",
    stock: 0,
    status: "blocked",
  },
  {
    id: "P007",
    name: "Minyak Goreng 1L",
    price: 15000,
    seller: "Warung Barokah",
    img: "/noimage.jpg",
    stock: 0,
    status: "blocked",
  },
];

export default function AdminProductList() {
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState("all"); // all | product | seller

  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = products.filter((p) => {
    const term = search.toLowerCase();

    if (searchFilter === "product") {
      return p.name.toLowerCase().includes(term);
    } else if (searchFilter === "seller") {
      return p.seller.toLowerCase().includes(term);
    }
    return (
      p.name.toLowerCase().includes(term) ||
      p.seller.toLowerCase().includes(term)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const direction = sortOrder === "asc" ? 1 : -1;

    if (a[sortBy] < b[sortBy]) return -1 * direction;
    if (a[sortBy] > b[sortBy]) return 1 * direction;
    return 0;
  });

  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Product List</h1>

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded-xl border shadow-sm mb-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          {/* Search Bar */}
          <div className="flex items-center gap-2 w-full bg-gray-50 px-4 py-2 rounded-xl border">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk atau penjual..."
              className="flex-1 outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Search Filter */}
          <select
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="px-3 py-2 border rounded-xl bg-white"
          >
            <option value="all">Semua</option>
            <option value="product">Produk</option>
            <option value="seller">Penjual</option>
          </select>

          {/* Sort By */}
          <div className="flex gap-2 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-xl bg-white"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border rounded-xl bg-white text-sm"
            >
              {sortOrder === "asc" ? "ASC ↑" : "DESC ↓"}
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white border rounded-xl shadow-sm">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : paginated.length === 0 ? (
          <p className="text-center text-gray-500 py-6">Tidak ada produk.</p>
        ) : (
          paginated.map((p) => <ProductRow key={p.id} product={p} />)
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-xl border bg-white disabled:opacity-40"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-600">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-xl border bg-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Product Row Component (clean modern design)
// ---------------------------------------------------------------
function ProductRow({ product }: any) {
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-none hover:bg-gray-50 transition">
      {/* Image */}
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.img}
          width={80}
          height={80}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-gray-500 text-sm">{product.seller}</p>
      </div>

      {/* Price */}
      <p className="w-28 text-sm font-semibold">
        Rp {product.price.toLocaleString("id-ID")}
      </p>

      {/* Stock */}
      <p className="w-20 text-sm text-gray-700">{product.stock} pcs</p>

      {/* Status */}
      <span
        className={`px-3 py-1 text-sm rounded-xl border ${
          product.status === "active"
            ? "bg-green-50 text-green-700 border-green-300"
            : product.status === "hidden"
            ? "bg-yellow-50 text-yellow-700 border-yellow-300"
            : "bg-red-50 text-red-700 border-red-300"
        }`}
      >
        {product.status}
      </span>

      {/* Actions */}
      <div className="flex gap-2">
        <ActionBtn label="Active" />
        <ActionBtn label="Hide" />
        <ActionBtn label="Block" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Skeleton Loader
// ---------------------------------------------------------------
function ProductSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-lg" />

      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-40" />
        <div className="h-3 bg-gray-200 rounded w-28" />
      </div>

      <div className="w-28 h-4 bg-gray-200 rounded" />
      <div className="w-20 h-4 bg-gray-200 rounded" />
      <div className="w-16 h-6 bg-gray-200 rounded-xl" />
      <div className="w-32 flex gap-2">
        <div className="h-8 w-16 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Reusable Action Button
// ---------------------------------------------------------------
function ActionBtn({ label }: { label: string }) {
  return (
    <button className="px-3 py-1.5 text-sm rounded-xl border bg-white hover:bg-gray-100">
      {label}
    </button>
  );
}
