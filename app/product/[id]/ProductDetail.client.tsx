"use client";

import { addToCart } from "@/services/cart.service";
import { ProductType, VariantType } from "@/types";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductActions } from "./components/ProductActions";
import { ProductDescription } from "./components/ProductDescription";
import { MobileHeader } from "./components/MobileHeader";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { createCheckoutSession } from "@/services/order.service";
import { useRouter } from "next/navigation";
import { showErrorToast, showLoadingToast } from "@/lib/toast";

export default function ProductDetailClient({
  product,
}: {
  product: ProductType;
}) {
  const variants = product.variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState<VariantType | null>(
    variants[0] ?? null,
  );
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const isCheckingOut = useRef(false);

  const handleAddToCart = async () => {
    if (!selectedVariant) return toast.error("Pilih varian dahulu");
    try {
      setLoading(true);
      toast.loading("Menambahkan...", { id: "cart" });
      await addToCart({ variantId: selectedVariant.id, quantity: qty });
      toast.success("Berhasil masuk keranjang", { id: "cart" });
    } catch (error: any) {
      if (
        error?.response?.status === 401 ||
        error?.message === "unauthorized"
      ) {
        toast.dismiss("cart");
        router.push("/login");
        return;
      }
      toast.error("Gagal menambahkan", { id: "cart" });
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();

  const handleCheckout = async () => {
    if (isCheckingOut.current) return;
    if (!selectedVariant) return toast.error("Pilih varian dahulu");

    isCheckingOut.current = true;
    let toastId: string | number | undefined;
    try {
      setLoading(true);
      toastId = showLoadingToast(
        "Memproses Checkout",
        "Mohon tunggu sebentar...",
      );

      const checkOutItem = {
        variantId: selectedVariant.id,
        quantity: qty,
      };

      const res = await createCheckoutSession({ items: [checkOutItem] });
      toast.dismiss(toastId);
      router.push(`/checkout/${res.externalId}`);
    } catch (error: any) {
      console.error("Checkout failed:", error);
      if (toastId) toast.dismiss(toastId);

      if (
        error?.response?.status === 401 ||
        error?.message === "unauthorized"
      ) {
        router.push("/login");
        isCheckingOut.current = false;
        setLoading(false);
        return;
      }
      showErrorToast(
        "Gagal checkout",
        "Terjadi kesalahan saat memproses checkout.",
      );
      isCheckingOut.current = false;
      setLoading(false);
    }
  };

  const price = selectedVariant?.price || 0;
  const stock = selectedVariant?.stock || 0;
  const isOutOfStock = stock <= 0;

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24 md:pb-12 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <MobileHeader productName={product.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="hover:text-slate-900 transition-colors cursor-pointer">
            {product.categoryName}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          <ProductGallery
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            isOutOfStock={isOutOfStock}
          />

          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            setQty={setQty}
            price={price}
          />

          <ProductActions
            price={price}
            qty={qty}
            setQty={setQty}
            stock={stock}
            isOutOfStock={isOutOfStock}
            loading={loading}
            handleAddToCart={handleAddToCart}
            handleCheckout={handleCheckout}
          />
        </div>

        <ProductDescription description={product.description} />
      </main>

      <MobileBottomBar
        handleAddToCart={handleAddToCart}
        handleCheckout={handleCheckout}
        loading={loading}
        isOutOfStock={isOutOfStock}
      />
    </div>
  );
}
