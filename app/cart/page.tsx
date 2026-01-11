"use client";

import { SafeImage } from "@/components/SafeImage";
import { useCartList } from "@/hooks/useCart";
import { CartItemType } from "@/types/cart";
import { Heart, Square, SquareCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/services/order.service";
import { CartSummary } from "./CartSummary";
import { MobileCheckout } from "./MobileCheckout";

export default function CartPage() {
  const router = useRouter();
  const [page] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const { data, isLoading, isFetching, error } = useCartList({ page });

  const items: CartItemType[] = data ?? [];

  const onCheckout = async () => {
    if (selectedItems.size === 0) {
      alert("Please select at least one item to checkout");
      return;
    }

    try {
      // Get selected cart items
      const selectedCartItems = items.filter((item) =>
        selectedItems.has(item.id)
      );

      // Prepare checkout session input
      const checkoutItems = selectedCartItems.map((item) => ({
        variantId: item.product?.variant?.id || "",
        quantity: item.quantity,
      }));

      // Create checkout session
      const session = await createCheckoutSession({
        items: checkoutItems,
      });

      // Navigate to checkout page
      router.push(`/checkout/${session.externalId}`);
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      alert("Failed to proceed to checkout. Please try again.");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalPrice = useMemo(() => {
    return items
      .filter((item) => selectedItems.has(item.id))
      .reduce(
        (sum, item) =>
          sum + (item?.product?.variant?.price ?? 0) * item.quantity,
        0
      );
  }, [items, selectedItems]);

  /* ---------- STATES ---------- */
  if (isLoading || isFetching) {
    return <p className="p-8 text-center">Loading cart...</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-500">Failed to load cart</p>;
  }

  if (items.length === 0) {
    return <p className="p-8 text-center text-gray-500">Your cart is empty</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 flex flex-col md:flex-row gap-6">
      {/* LEFT - CART LIST */}
      <div className="flex-1 flex flex-col gap-4">
        {items.map((item) => {
          const { product, quantity } = item;
          if (!product) return;
          const { variant } = product;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 flex gap-4 shadow-sm border"
            >
              {/* CHECKBOX */}
              <button onClick={() => toggleSelect(item.id)} className="mt-2">
                {selectedItems.has(item.id) ? (
                  <SquareCheck className="text-green-600" />
                ) : (
                  <Square className="text-gray-400" />
                )}
              </button>

              {/* IMAGE */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                <SafeImage
                  src="/placeholder.png"
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-green-600 font-bold mt-1">
                    Rp {variant.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">Qty: {quantity}</p>
                  <Heart className="text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDEBAR */}
      <CartSummary total={totalPrice} onCheckout={onCheckout} />

      {/* MOBILE CHECKOUT */}
      <MobileCheckout total={totalPrice} onCheckout={onCheckout} />
    </div>
  );
}
