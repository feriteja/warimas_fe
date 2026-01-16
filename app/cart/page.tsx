"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Trash2,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Store,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { MobileCheckout } from "./MobileCheckout";

// --- 1. Definisi Tipe Data (Sesuai JSON Anda) ---
interface Variant {
  id: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface Product {
  id: string;
  name: string;
  sellerName: string;
  variant: Variant;
}

interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface PageInfo {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface CartResponse {
  items: CartItem[];
  pageInfo: PageInfo;
}

// --- 2. Data Mock Awal ---
const INITIAL_DATA: CartResponse = {
  items: [
    {
      id: "37",
      quantity: 1,
      product: {
        id: "prod-1",
        name: "Peralatan Kecil 1 (Set Lengkap)",
        sellerName: "Toko Feibaru Official",
        variant: {
          id: "var-1",
          price: 6310,
          stock: 20,
          imageUrl:
            "https://via.placeholder.com/200/F3F4F6/000000?text=Produk+1",
        },
      },
    },
    {
      id: "36",
      quantity: 5,
      product: {
        id: "prod-2",
        name: "Plastik & Kantong Sampah 4 - Tahan Bocor",
        sellerName: "Toko Feibaru Official",
        variant: {
          id: "var-2",
          price: 16852,
          stock: 38,
          imageUrl:
            "https://via.placeholder.com/200/F3F4F6/000000?text=Produk+2",
        },
      },
    },
    {
      id: "35",
      quantity: 1,
      product: {
        id: "prod-3",
        name: "Plastik & Kantong Sampah 4 (Ukuran Kecil)",
        sellerName: "Toko Feibaru Official",
        variant: {
          id: "var-3",
          price: 5338,
          stock: 82,
          imageUrl:
            "https://via.placeholder.com/200/F3F4F6/000000?text=Produk+3",
        },
      },
    },
  ],
  pageInfo: {
    totalItems: 3,
    totalPages: 1,
    page: 1,
    limit: 20,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

// --- 3. Helper: Format Rupiah ---
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function CartPage() {
  //State
  const [cartData, setCartData] = useState<CartResponse>(INITIAL_DATA);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // --- Logic ---

  const handleQuantityChange = (itemId: string, delta: number) => {
    setCartData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          if (newQty < 1) return item;
          if (newQty > item.product.variant.stock) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    }));
  };

  const handleDelete = (itemId: string) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus barang ini dari keranjang?")
    ) {
      setCartData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      }));
      const newSelected = new Set(selectedItems);
      newSelected.delete(itemId);
      setSelectedItems(newSelected);
    }
  };

  const toggleSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cartData.items.length) {
      setSelectedItems(new Set());
    } else {
      const allIds = cartData.items.map((item) => item.id);
      setSelectedItems(new Set(allIds));
    }
  };

  const summary = useMemo(() => {
    let totalPrice = 0;
    let totalItems = 0;

    cartData.items.forEach((item) => {
      if (selectedItems.has(item.id)) {
        totalPrice += item.product.variant.price * item.quantity;
        totalItems += item.quantity;
      }
    });

    return { totalPrice, totalItems };
  }, [cartData, selectedItems]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar Simple */}
      <nav className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <ShoppingBag className="text-green-600" />
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            Keranjang Belanja
          </h1>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 pb-28 md:px-6 lg:px-8 lg:pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* --- KOLOM KIRI: Daftar Item (8 kolom) --- */}
          <div className="lg:col-span-8">
            {/* Header: Pilih Semua */}
            {cartData.items.length > 0 ? (
              <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={
                      cartData.items.length > 0 &&
                      selectedItems.size === cartData.items.length
                    }
                    onChange={toggleSelectAll}
                    className="h-5 w-5 cursor-pointer rounded border-slate-300 text-green-600 focus:ring-green-500"
                    id="selectAll"
                  />
                  <label
                    htmlFor="selectAll"
                    className="cursor-pointer text-sm font-semibold text-slate-700"
                  >
                    Pilih Semua ({cartData.items.length})
                  </label>
                </div>
                <button
                  onClick={() => alert("Menghapus item terpilih...")}
                  disabled={selectedItems.size === 0}
                  className="text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-30 disabled:hover:text-red-500"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-sm">
                <ShoppingBag size={48} className="mb-4 text-slate-300" />
                <h3 className="text-lg font-medium text-slate-900">
                  Keranjang Anda kosong
                </h3>
                <p className="mt-1 text-slate-500">
                  Yuk, isi dengan barang-barang impianmu!
                </p>
              </div>
            )}

            {/* List Item */}
            <div className="space-y-4">
              {cartData.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-green-100 hover:shadow-md md:flex-row md:items-start"
                >
                  {/* Checkbox */}
                  <div className="absolute left-4 top-5 md:static md:mt-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="h-5 w-5 cursor-pointer rounded border-slate-300 text-green-600 focus:ring-green-500"
                    />
                  </div>

                  {/* Gambar Produk */}
                  <div className="ml-8 md:ml-0 relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-100">
                    <Image
                      src={
                        item.product.variant.imageUrl ||
                        "https://via.placeholder.com/150"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Detail Produk */}
                  <div className="ml-8 md:ml-0 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Nama Toko */}
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Store size={14} className="text-green-500" />
                        {item.product.sellerName}
                      </div>

                      {/* Nama Produk */}
                      <h3 className="text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
                        {item.product.name}
                      </h3>

                      {/* Stok Info */}
                      <p className="mt-1 text-xs text-slate-400">
                        Sisa stok: {item.product.variant.stock}
                      </p>
                    </div>

                    {/* Harga Mobile (muncul di bawah nama saat layar kecil) */}
                    <div className="mt-2 block md:hidden font-bold text-green-600">
                      {formatRupiah(item.product.variant.price)}
                    </div>
                  </div>

                  {/* Kolom Kanan: Harga & Kontrol (Desktop) */}
                  <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end md:justify-start pl-8 md:pl-0">
                    {/* Harga Desktop */}
                    <div className="hidden text-right md:block">
                      <div className="text-lg font-bold text-slate-900">
                        {formatRupiah(item.product.variant.price)}
                      </div>
                    </div>

                    {/* Kontrol Kuantitas & Hapus */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Hapus Barang"
                      >
                        <Trash2 size={20} />
                      </button>

                      <div className="flex h-9 items-center rounded-full border border-slate-300 bg-white">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="flex h-full w-9 items-center justify-center rounded-l-full text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={item.quantity >= item.product.variant.stock}
                          className="flex h-full w-9 items-center justify-center rounded-r-full text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {cartData.items.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm border border-slate-200">
                  <button
                    disabled={!cartData.pageInfo.hasPreviousPage}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="px-4 text-sm font-medium text-slate-600">
                    Halaman {cartData.pageInfo.page}
                  </span>
                  <button
                    disabled={!cartData.pageInfo.hasNextPage}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --- KOLOM KANAN: Ringkasan Belanja (4 kolom) --- */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-slate-800">
                  Ringkasan Belanja
                </h2>

                <div className="space-y-3 border-b border-slate-100 pb-6">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Total Barang ({summary.totalItems})</span>
                    <span className="font-medium text-slate-900">
                      {formatRupiah(summary.totalPrice)}
                    </span>
                  </div>
                  {/* Contoh Diskon (Hardcoded untuk UI) */}
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Total Diskon Barang</span>
                    <span className="font-medium text-green-600">-Rp 0</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-base font-bold text-slate-800">
                    Total Harga
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {formatRupiah(summary.totalPrice)}
                  </span>
                </div>

                <button
                  disabled={selectedItems.size === 0}
                  onClick={() =>
                    alert(`Lanjut checkout dengan ${summary.totalItems} barang`)
                  }
                  className="mt-6 w-full rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0"
                >
                  Beli ({selectedItems.size})
                </button>
              </div>

              {/* Jaminan Keamanan (Trust Badge) */}
              <div className="flex items-center justify-center gap-2 rounded-xl border border-green-50 bg-green-50/50 p-4 text-xs font-medium text-green-700">
                <ShieldCheck size={18} />
                <span>Transaksi aman & terpercaya</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom Bar */}
      <MobileCheckout
        total={summary.totalPrice}
        onCheckout={() => {}}
        selectedItems={selectedItems.size}
      />
    </div>
  );
}
