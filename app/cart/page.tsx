"use client";

import { useCart } from "@/lib/store/cart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculated = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculated);
  }, [items]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {item.productName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">
                    Variant:
                    <span className="font-semibold text-lg text-gray-700">
                      {item.variantName}
                    </span>
                    · {item.quantityType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rp {item.price.toLocaleString()} × {item.quantity}
                    <span className="font-semibold text-gray-800 ml-2">
                      = Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.variantId!, parseInt(e.target.value))
                    }
                    className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm"
                  />
                  <button
                    onClick={() => removeItem(item.variantId!)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 text-right">
            <h2 className="text-xl font-bold text-gray-900">
              Total: Rp {total.toLocaleString()}
            </h2>
            <Link href="/invoice">
              <button className="font-bold bg-green-400 px-2 py-1 text-white rounded-md shadow-2xl">
                Make invoice
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
