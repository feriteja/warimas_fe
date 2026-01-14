import { OrderType } from "@/types";
import { ShoppingBag, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrderItemCard({ order }: { order: OrderType }) {
  // Status Color Logic
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "success":
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "canceled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const firstItem = order.items[0];
  const otherItemsCount = order.items.length - 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-4">
        {/* Top Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium tracking-tight">
                Order ID #{order.id}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Calendar size={12} />
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(
              order.status
            )} uppercase`}
          >
            {order.status}
          </span>
        </div>

        <hr className="border-gray-50 mb-4" />

        {/* Product Preview */}
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 animate-pulse" />
          {/* Note: In production, use SafeImage here with product image */}

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate text-sm">
              {firstItem?.productName}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {firstItem?.variantName} • {firstItem?.quantity} pcs
            </p>
            {otherItemsCount > 0 && (
              <p className="text-[11px] text-gray-400 mt-1">
                +{otherItemsCount} produk lainnya
              </p>
            )}
          </div>
        </div>

        {/* Bottom Total & Action */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-medium">
              Total Belanja
            </p>
            <p className="font-bold text-gray-900">
              Rp {order.totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          <Link
            href={`/orders/${order.id}`}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            Lihat Detail <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
