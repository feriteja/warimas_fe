"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { MobileCheckout } from "./MobileCheckout";
import { CartListResponse } from "@/types/cart";
import {
  getCartList,
  updateCartList,
  deleteCartList,
} from "@/services/cart.service";
import { createCheckoutSession } from "@/services/order.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { DeleteModal } from "./DeleteModal";

export default function CartPage() {
  //State
  const [cartData, setCartData] = useState<CartListResponse>();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "single" | "bulk";
    itemId?: string;
  }>({ isOpen: false, type: "single" });
  const router = useRouter();

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
          i.id === itemId ? { ...i, quantity: newQty } : i,
        ),
      };
    });

    try {
      await updateCartList({
        variantId: item.product.variant.id,
        quantity: newQty,
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Gagal memperbarui jumlah barang. Silakan coba lagi.");
      // Revert/Refetch on error
      const res = await getCartList({ page: 1 });
      setCartData(res);
    }
  };

  const performBulkDelete = async () => {
    if (!cartData?.items || cartData.items.length === 0) return;

    const variantIds = cartData.items
      .map((item) => item.product?.variant?.id)
      .filter((id): id is string => Boolean(id));

    if (variantIds.length === 0) return;

    const previousCartData = { ...cartData };
    const previousSelectedItems = new Set(selectedItems);
    setCartData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: [],
      };
    });
    setSelectedItems(new Set());

    try {
      // Shorthand syntax { variantIds } is cleaner
      await deleteCartList({ variantIds });
    } catch (error) {
      console.error("Failed to delete items:", error);
      toast.error("Gagal menghapus barang. Silakan coba lagi.");

      // 6. Rollback: Restore previous state on failure
      setCartData(previousCartData);
      setSelectedItems(previousSelectedItems);
    }
  };

  const performSingleDelete = async (itemId: string) => {
    const item = cartData?.items.find((i) => i.id === itemId);
    if (!item || !item.product) return;

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
      toast.error("Gagal menghapus barang. Silakan coba lagi.");
      // Revert/Refetch on error
      const res = await getCartList({ page: 1 });
      setCartData(res);
    }
  };

  const confirmDelete = () => {
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
    if (deleteModal.type === "single" && deleteModal.itemId) {
      performSingleDelete(deleteModal.itemId);
    } else if (deleteModal.type === "bulk") {
      performBulkDelete();
    }
  };

  const openDeleteModal = (itemId: string) => {
    setDeleteModal({ isOpen: true, type: "single", itemId });
  };

  const openBulkDeleteModal = () => {
    if (!cartData?.items || cartData.items.length === 0) return;
    setDeleteModal({ isOpen: true, type: "bulk" });
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

  const handleCheckout = async () => {
    try {
      if (!cartData || cartData.items.length === 0) return;
      setIsCheckoutLoading(true);

      const validItems = cartData.items.filter(
        (item) => item.product && selectedItems.has(item.id),
      );

      const checkOutIds = validItems.map((item) => {
        return {
          variantId: item.product!.variant.id,
          quantity: item.quantity,
        };
      });

      if (checkOutIds.length === 0) {
        throw new Error("No valid products found in cart");
      }

      const res = await createCheckoutSession({ items: checkOutIds });
      router.push(`/checkout/${res.externalId}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Gagal memproses checkout. Silakan coba lagi.");
      setIsCheckoutLoading(false);
    }
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

  const getCartData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getCartList({ page: 1 });
      setCartData(res);
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      toast.error("Gagal memuat data keranjang.");
      setCartData(undefined);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCartData();
  }, [getCartData]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-slate-500">Memuat keranjang Anda...</p>
        </div>
      </div>
    );

  if (!cartData)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 p-4">
        <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <XCircle className="mb-4 h-12 w-12 text-red-400" />
          <h3 className="text-xl font-bold text-slate-800">
            Gagal Memuat Keranjang
          </h3>
          <p className="mt-2 text-slate-500">
            Terjadi masalah saat mengambil data keranjang Anda. Silakan coba
            muat ulang halaman.
          </p>
          <button
            onClick={getCartData}
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        type={deleteModal.type}
        // itemId is handled by closure/state in parent if needed, but here we just need to close or confirm
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
      />

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
                  onClick={openBulkDeleteModal}
                  disabled={selectedItems.size === 0}
                  className="text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-30 disabled:hover:text-red-500"
                >
                  Hapus Semua
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
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.has(item.id)}
                    onToggle={toggleSelection}
                    onQuantityChange={handleQuantityChange}
                    onDelete={openDeleteModal}
                  />
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
          <CartSummary
            totalPrice={summary.totalPrice}
            totalItems={summary.totalItems}
            selectedCount={selectedItems.size}
            isLoading={isCheckoutLoading}
            onCheckout={handleCheckout}
          />
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
