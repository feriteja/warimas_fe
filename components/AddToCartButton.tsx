"use client";

import { useCart } from "@/lib/store/cart";
import { ProductType, VariantInputType } from "@/types/global";

export function AddToCartButton({
  variant,
  product,
}: {
  variant: Pick<VariantInputType, "id" | "name" | "price" | "quantityType">;
  product: Pick<ProductType, "id" | "name">;
}) {
  const { addItem } = useCart();

  const handleClick = () => {
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantName: variant.name,
      price: variant.price,
      quantity: 1,
      quantityType: variant.quantityType,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 text-sm"
    >
      Add to Cart
    </button>
  );
}
