import React from "react";
import { SafeImage } from "../SafeImage";
import { ProductType } from "@/types";
import { formatIDR } from "@/lib/utils";
import Link from "next/link";

// Helper to get display price (range or single)
const getProductPriceDisplay = (variants: any[]) => {
  if (!variants || variants.length === 0) return "Rp 0";
  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatIDR(min) : `${formatIDR(min)} - ${formatIDR(max)}`;
};

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Link href={`product/${product.id}`}>
      <div className="group relative flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Image Area */}
        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
          {product.imageUrl ? (
            <SafeImage
              src={product.imageUrl}
              alt={product.name}
              fill
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-sm">Tidak Ada Gambar</span>
            </div>
          )}
          {/* Status Badge */}
          {product.status === "active" && (
            <div className="absolute top-2 left-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full border border-emerald-100">
              Tersedia
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-1">
          <div className="mb-1 text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.categoryName}
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto">
            <div className="text-lg font-bold text-gray-900">
              {getProductPriceDisplay(product.variants)}
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">
                {product.sellerName.charAt(0).toUpperCase()}
              </div>
              <span className="truncate">{product.sellerName}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
