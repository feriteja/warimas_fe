"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import placeHolder from "../../../public/images/placeholder-product.png";
import { ProductType } from "@/types";

export default function ProductDetailClient({
  product,
}: {
  product: ProductType;
}) {
  const variants = product?.variants ?? [];

  const defaultVariant = variants[0] ?? null;
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

  const mainImage = useMemo(() => {
    return selectedVariant?.imageUrl || product?.imageUrl || placeHolder;
  }, [selectedVariant, product]);

  if (!product) {
    return <div className="text-center py-20">Produk tidak tersedia</div>;
  }

  return (
    <div className="pb-28 max-w-7xl md:px-5 mx-auto mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Gallery */}
        <div className="flex-1">
          <div className="w-full aspect-[4/3] relative bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeHolder.src;
              }}
            />
          </div>

          {/* Thumbnails */}
          {variants.length > 0 && (
            <div className="flex gap-3 mt-3 overflow-x-auto">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border relative
                    ${
                      selectedVariant?.id === v.id
                        ? "border-black"
                        : "border-gray-300"
                    }
                  `}
                >
                  <Image
                    src={v.imageUrl || placeHolder}
                    alt={v.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-5 p-5">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-600">
              {product.categoryName} • {product.subcategoryName}
            </p>
          </div>

          {/* Variant Selector */}
          {variants.length > 0 ? (
            <div>
              <h2 className="font-semibold text-lg mb-2">Pilih Varian</h2>
              <div className="flex gap-3 overflow-x-auto">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`min-w-[110px] p-3 rounded-xl border text-left
                      ${
                        selectedVariant?.id === v.id
                          ? "border-black bg-gray-50"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-gray-600">
                      Rp {v.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Stock: {v.stock}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Tidak ada varian tersedia</p>
          )}

          {/* Description */}
          <div>
            <h2 className="font-semibold text-lg mb-1">Deskripsi</h2>
            <p className="text-sm text-gray-700">
              {product.description || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 max-w-3xl mx-auto">
        <button className="flex-1 py-3 rounded-xl border">Beli Sekarang</button>
        <button
          disabled={!selectedVariant || selectedVariant.stock <= 0}
          className="flex-1 py-3 rounded-xl bg-black text-white disabled:bg-gray-400"
          onClick={() => {
            if (!selectedVariant) return;
            console.log("ADD TO CART", selectedVariant);
          }}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
