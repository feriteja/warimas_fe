"use client";

import { SafeImage } from "@/components/SafeImage";
import { addToCart } from "@/services/cart.service";
import { ProductType } from "@/types";
import { useMemo, useState } from "react";
import { toast } from "sonner";
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

  /* ---------------- actions ---------------- */

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Pilih varian terlebih dahulu");
      return;
    }

    try {
      setLoading(true);

      // 🔮 optimistic UX
      toast.loading("Menambahkan ke keranjang...", { id: "cart" });

      await addToCart({
        variantId: selectedVariant.id,
        quantity: qty,
      });

      toast.success("Berhasil ditambahkan ke keranjang", {
        id: "cart",
      });
    } catch {
      toast.error("Gagal menambahkan ke keranjang", {
        id: "cart",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      toast.error("Pilih varian terlebih dahulu");
      return;
    }

    toast.success("Menuju checkout...");
    // 👉 router.push(`/checkout?variant=${selectedVariant.id}&qty=${qty}`)
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="pb-36 max-w-7xl  mx-auto px-4 md:px-6 mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="flex-1 w-full  md:max-w-md mx-auto">
          <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100">
            <SafeImage
              src={mainImage}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4  overflow-x-auto">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`w-20 min-w-20 h-20 rounded-xl border overflow-hidden relative
                  ${
                    selectedVariant?.id === v.id
                      ? "border-emerald-600 ring-2 ring-emerald-200"
                      : "border-gray-200"
                  }
                `}
              >
                <SafeImage
                  src={v.imageUrl || placeHolder}
                  alt={v.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-5">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-500">
              {product.categoryName} • {product.subcategoryName}
            </p>
          </div>

          {/* Variant */}
          <div>
            <h2 className="font-semibold mb-2">Varian</h2>
            <div className="flex gap-3 max-w-xl px-5 overflow-x-auto">
              {variants.map((v) => (
                <button
                  key={v.id}
                  disabled={v.stock <= 0}
                  onClick={() => setSelectedVariant(v)}
                  className={`min-w-[120px] p-3 rounded-xl border text-left
                    ${
                      selectedVariant?.id === v.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200"
                    }
                    ${
                      v.stock <= 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-emerald-400"
                    }
                  `}
                >
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs">
                    Rp {v.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[11px] text-gray-500">Stock: {v.stock}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h2 className="font-semibold mb-2">Jumlah</h2>
            <div className="inline-flex items-center border rounded-xl">
              <button
                className="px-4 py-2"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-4 text-sm font-medium">{qty}</span>
              <button
                className="px-4 py-2"
                onClick={() =>
                  setQty((q) =>
                    selectedVariant ? Math.min(q + 1, selectedVariant.stock) : q
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-3xl mx-auto flex gap-3 p-4">
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-semibold"
          >
            Beli Sekarang
          </button>

          <button
            onClick={handleAddToCart}
            disabled={loading || !selectedVariant}
            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-semibold
              disabled:bg-gray-300"
          >
            {loading ? "Menambahkan..." : "Tambah ke Keranjang"}
          </button>
        </div>
      </div>
    </div>
  );
}
