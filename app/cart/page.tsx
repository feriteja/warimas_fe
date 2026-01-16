"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { formatIDR } from "@/lib/utils";
import { CartListResponse } from "@/types/cart";
import {
  getCartList,
  updateCartList,
  deleteCartList,
} from "@/services/cart.service";
import { SafeImage } from "@/components/SafeImage";

// --- 1. Definisi Tipe Data (Sesuai JSON Anda) ---

// --- 2. Data Mock Awal ---

export default function CartPage() {
  //State
  const [cartData, setCartData] = useState<CartListResponse>();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // --- Logic ---

  const handleQuantityChange = async (itemId: string, delta: number) => {
    const item = cartData?.items.find((i) => i.id === itemId);
    if (!item || !item.product) return;

    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    if (newQty > item.product.variant.stock) return;

    // Optimistic Update
    setCartData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((i) =>
          i.id === itemId ? { ...i, quantity: newQty } : i
        ),
      };
    });

    try {
      console.log({ variantId: item.product.variant.id, quantity: newQty });

      const test = await updateCartList({
        variantId: item.product.variant.id,
        quantity: newQty,
      });

      console.log({ test });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      // Revert/Refetch on error
      const res = await getCartList({ page: 1 });
      setCartData(res);
    }
  };

  const handeBulkDelete = async () => {
    if (
      confirm("Apakah Anda yakin ingin menghapus semua barang dari keranjang?")
    ) {
      const cartItems = cartData?.items.map((i) => i.product?.variant.id);
      if (!cartItems) return;

      // Optimistic Update
      setCartData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: [],
        };
      });
      setSelectedItems(new Set());

      try {
        await deleteCartList({ variantIds: cartItems });
      } catch (error) {
        console.error("Failed to delete items:", error);
      }
    }
  };

  const handleDelete = async (itemId: string) => {
    const item = cartData?.items.find((i) => i.id === itemId);
    if (!item || !item.product) return;

    if (
      confirm("Apakah Anda yakin ingin menghapus barang ini dari keranjang?")
    ) {
      // Optimistic Update
      setCartData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== itemId),
        };
      });
      setSelectedItems((prev) => {
        const newSelected = new Set(prev);
        newSelected.delete(itemId);
        return newSelected;
      });

      try {
        await deleteCartList({ variantIds: [item.product.variant.id] });
      } catch (error) {
        console.error("Failed to delete item:", error);
        // Revert/Refetch on error
        const res = await getCartList({ page: 1 });
        setCartData(res);
      }
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
    if (!cartData) return;
    if (selectedItems.size === cartData?.items.length) {
      setSelectedItems(new Set());
    } else {
      const allIds = cartData?.items.map((item) => item.id);
      setSelectedItems(new Set(allIds));
    }
  };

  const handleCheckout = () => {
    alert(`Lanjut checkout dengan ${summary.totalItems} barang`);
  };

  const summary = useMemo(() => {
    let totalPrice = 0;
    let totalItems = 0;

    cartData?.items.forEach((item) => {
      if (selectedItems.has(item.id) && item.product) {
        totalPrice += item.product.variant.price * item.quantity;
        totalItems += item.quantity;
      }
    });

    return { totalPrice, totalItems };
  }, [cartData, selectedItems]);

  useEffect(() => {
    const getCartData = async () => {
      try {
        setIsLoading(true);
        const res = await getCartList({ page: 1 });
        setCartData(res);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCartData();
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );

  if (!cartData)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Gagal memuat data keranjang.
      </div>
    );

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
                  onClick={() => handeBulkDelete()}
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
                  Yuk, isi dengan barang-barang kebutuhanmu!
                </p>
              </div>
            )}

            {/* List Item */}
            <div className="space-y-4">
              {cartData.items.length > 0 &&
                cartData.items.map((item) => (
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
                      <SafeImage
                        src={
                          item.product?.variant.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.product?.name || "Product Image"}
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
                          {item.product?.sellerName}
                        </div>

                        {/* Nama Produk */}
                        <h3 className="text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
                          {item.product?.name}
                        </h3>

                        {/* Stok Info */}
                        <p className="mt-1 text-xs text-slate-400">
                          Sisa stok: {item.product?.variant.stock}
                        </p>
                      </div>

                      {/* Harga Mobile (muncul di bawah nama saat layar kecil) */}
                      <div className="mt-2 block md:hidden font-bold text-green-600">
                        {formatIDR(item.product?.variant.price ?? 0)}
                      </div>
                    </div>

                    {/* Kolom Kanan: Harga & Kontrol (Desktop) */}
                    <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end md:justify-start pl-8 md:pl-0">
                      {/* Harga Desktop */}
                      <div className="hidden text-right md:block">
                        <div className="text-lg font-bold text-slate-900">
                          {formatIDR(item.product?.variant.price ?? 0)}
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
                            disabled={
                              !item.product ||
                              item.quantity >= item.product.variant.stock
                            }
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
                      {formatIDR(summary.totalPrice)}
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
                    {formatIDR(summary.totalPrice)}
                  </span>
                </div>

                <button
                  disabled={selectedItems.size === 0}
                  onClick={handleCheckout}
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
        onCheckout={handleCheckout}
        selectedItems={selectedItems.size}
      />
    </div>
  );
}
