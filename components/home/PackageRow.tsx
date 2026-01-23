"use client";

import { createCheckoutSession } from "@/services/order.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PackageRow({ item, actionLabel, isSecondary }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Calculate total price from items inside the package
  const totalPrice =
    item.items?.reduce(
      (sum: number, i: any) => sum + i.price * (i.quantity || 1),
      0,
    ) || 0;

  const handleBuy = async () => {
    setLoading(true);
    try {
      // Map package items to checkout input
      const checkoutItems = item.items.map((i: any) => ({
        variantId: i.variantId || i.id,
        quantity: i.quantity || 1,
      }));

      const res = await createCheckoutSession({
        items: checkoutItems,
      });

      if (res && res.externalId) {
        router.push(`/checkout/${res.externalId}`);
      } else {
        toast.error("Gagal membuat sesi checkout");
      }
    } catch (error) {
      setLoading(false);
      console.error("Checkout Error:", error);
      toast.error("Terjadi kesalahan saat memproses pesanan");
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition group">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
        <p className="text-gray-500 text-xs mt-0.5">
          Rp {totalPrice.toLocaleString("id-ID")}
        </p>
      </div>
      <button
        onClick={handleBuy}
        disabled={loading}
        className={`
        text-xs font-semibold px-4 py-2 rounded-lg transition
        ${
          isSecondary
            ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
        }
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
      >
        {loading ? "Proses..." : actionLabel}
      </button>
    </div>
  );
}
