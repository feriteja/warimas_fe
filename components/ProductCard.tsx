import { ProductType } from "@/types/global";
import Link from "next/link";
import React from "react";
import CustomPriceInput from "./CustomPriceInput";
import { AddToCartButton } from "./AddToCartButton";

function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
      <Link href={`/product/${product.id}`}>
        <div className="h-20 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-4xl font-bold">
          📦
        </div>
      </Link>

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        {product.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-4 space-y-2">
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-100 p-3 rounded-lg"
            >
              <div>
                <div className="font-semibold text-lg text-gray-700">
                  {variant.name}
                </div>
                <div className="text-sm text-gray-500">
                  Rp {variant.price.toLocaleString()} · Stock:
                  {variant.stock}
                </div>
              </div>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full uppercase">
                {variant.quantityType}
              </span>
              <AddToCartButton product={product} variant={variant} />
            </div>
          ))}
          <CustomPriceInput name={product.name} id={product.id} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
