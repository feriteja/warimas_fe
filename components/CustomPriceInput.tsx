"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { ProductType } from "@/types/global";

type CustomPriceInputProps = Pick<ProductType, "id" | "name">;

function CustomPriceInput({
  id = "000",
  name = "Custom Product",
}: CustomPriceInputProps) {
  const { addItem } = useCart();
  const [price, setPrice] = useState<number | "">("");
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = () => {
    if (!price || price <= 0) return;

    addItem({
      variantId: `${id}-${name}-${totalItems}-custom-${price}-${
        price + totalItems
      }`,
      productId: id,
      productName: name,
      variantName: "Custom",
      price: Number(price),
      quantity: 1,
      quantityType: "Unit",
    });

    setPrice(""); // Reset input
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600 mb-1" htmlFor="custom-price">
          Custom Price
        </label>
        <div className="flex flex-row">
          <input
            id="custom-price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            min="0"
            placeholder="Enter price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <button
            onClick={handleAddToCart}
            className="ml-4 p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
            disabled={!price || price <= 0}
            title="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomPriceInput;
