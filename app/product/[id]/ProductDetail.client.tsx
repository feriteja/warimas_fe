"use client";

import { SafeImage } from "@/components/SafeImage";
import { addToCart } from "@/services/cart.service";
import { ProductType } from "@/types";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import placeHolder from "../../../public/images/placeholder-product.png";

export default function ProductDetailClient({
  product,
}: {
  product: ProductType;
}) {
  const variants = product.variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState(variants[0] ?? null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const mainImage = useMemo(
    () => selectedVariant?.imageUrl || product.imageUrl || placeHolder,
    [selectedVariant, product.imageUrl]
  );

  const handleAddToCart = async () => {
    if (!selectedVariant) return toast.error("Pilih varian dahulu");
    try {
      setLoading(true);
      toast.loading("Menambahkan...", { id: "cart" });
      await addToCart({ variantId: selectedVariant.id, quantity: qty });
      toast.success("Berhasil masuk keranjang", { id: "cart" });
    } catch {
      toast.error("Gagal menambahkan", { id: "cart" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Mobile Header Nav */}
      <div className="md:hidden flex items-center p-4 sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b">
        <Link href="/">
          <ChevronLeft className="text-gray-600" />
        </Link>
        <span className="ml-4 font-semibold truncate">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6">
        {/* Breadcrumbs (Desktop) */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {product.categoryName}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: Image Gallery (Sticky on Desktop) */}
          <div className="md:sticky md:top-24 self-start space-y-4">
            <div className="aspect-square relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
              <SafeImage
                src={mainImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`relative w-20 h-20 rounded-xl border-2 flex-shrink-0 transition-all 
                    ${
                      selectedVariant?.id === v.id
                        ? "border-emerald-500 shadow-md"
                        : "border-transparent opacity-60"
                    }`}
                >
                  <SafeImage
                    src={v.imageUrl || placeHolder}
                    alt={v.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-6 mb-6">
              <span className="text-emerald-600 text-sm font-bold uppercase tracking-wider">
                {product.sellerName || "Official Store"}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  Rp {selectedVariant?.price.toLocaleString("id-ID") || "0"}
                </span>
                {selectedVariant && selectedVariant.stock < 10 && (
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    Sisa {selectedVariant.stock} stok!
                  </span>
                )}
              </div>
            </div>

            {/* Variant Picker */}
            <div className="space-y-4 mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase">
                Pilih Varian
              </h2>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    disabled={v.stock <= 0}
                    onClick={() => {
                      setSelectedVariant(v);
                      setQty(1);
                    }}
                    className={`px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all
                      ${
                        selectedVariant?.id === v.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"
                      }
                      ${v.stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-8">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-gray-900 uppercase">
                  Jumlah
                </h2>
                <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 w-fit bg-gray-50">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-white rounded-xl transition shadow-sm disabled:opacity-30"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900">
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) =>
                        selectedVariant
                          ? Math.min(q + 1, selectedVariant.stock)
                          : q
                      )
                    }
                    className="p-2 hover:bg-white rounded-xl transition shadow-sm disabled:opacity-30"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Benefits info */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  Garansi Ori
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Truck size={20} />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  Pengiriman Cepat
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none text-gray-600">
              <h2 className="text-sm font-bold text-gray-900 uppercase mb-2">
                Deskripsi Produk
              </h2>
              <p className="leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* WRAPPER: 
    - Desktop: Appears right after the description (relative)
    - Mobile: Floats at the bottom (fixed) 
*/}
      <div
        className="
  /* Mobile Styles */
  fixed bottom-0 left-0 right-0 z-40 
  bg-white/95 backdrop-blur-sm border-t p-4
  /* Desktop Styles (MD breakpoint) */
  md:relative md:bg-transparent md:border-t-0 md:p-0 md:mt-8 md:z-auto
"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Price - Hidden on mobile, shown on desktop for clarity */}
          <div className="hidden md:flex flex-col">
            <span className="text-xs text-gray-500 font-medium">
              Total Harga
            </span>
            <span className="text-xl font-bold text-emerald-600">
              Rp {(qty * (selectedVariant?.price || 0)).toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex flex-1 gap-3 max-w-md md:max-w-sm ml-auto">
            {/* Secondary Button: Smaller padding on desktop */}
            <button
              onClick={() => toast.success("Menuju Checkout...")}
              className="flex-1 py-3 px-4 md:py-2.5 rounded-xl border-2 border-emerald-600 text-emerald-600 text-sm md:text-base font-bold hover:bg-emerald-50 transition active:scale-95 whitespace-nowrap"
            >
              Beli Langsung
            </button>

            {/* Primary Button: Added a subtle pulse for attention */}
            <button
              disabled={
                loading || !selectedVariant || selectedVariant.stock <= 0
              }
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 md:py-2.5 rounded-xl bg-emerald-600 text-white text-sm md:text-base font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 disabled:bg-gray-300 whitespace-nowrap"
            >
              <ShoppingCart size={18} />
              {loading ? "..." : "Keranjang"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
