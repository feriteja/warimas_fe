// d:\project\warimas\warimas_fe\app\cart\CartItem.tsx
import React from "react";
import { Minus, Plus, Store, Trash2 } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { formatIDR } from "@/lib/utils";
import { CartListResponse } from "@/types/cart";

type CartItemType = CartListResponse["items"][0];

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
  onDelete: (id: string) => void;
}

export function CartItem({
  item,
  isSelected,
  onToggle,
  onQuantityChange,
  onDelete,
}: CartItemProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-green-100 hover:shadow-md md:flex-row md:items-start">
      {/* Checkbox */}
      <div className="absolute left-4 top-5 md:static md:mt-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(item.id)}
          className="h-5 w-5 cursor-pointer rounded border-slate-300 text-green-600 focus:ring-green-500"
        />
      </div>

      {/* Product Image */}
      <div className="ml-8 md:ml-0 relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-100">
        <SafeImage
          src={
            item.product?.variant.imageUrl || "https://via.placeholder.com/150"
          }
          alt={item.product?.name || "Product Image"}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="ml-8 md:ml-0 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller Name */}
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Store size={14} className="text-green-500" />
            {item.product?.sellerName}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
            {item.product?.name}
          </h3>

          {/* Stock Info */}
          <p className="mt-1 text-xs text-slate-400">
            Sisa stok: {item.product?.variant.stock}
          </p>
        </div>

        {/* Mobile Price */}
        <div className="mt-2 block md:hidden font-bold text-green-600">
          {formatIDR(item.product?.variant.price ?? 0)}
        </div>
      </div>

      {/* Right Column: Price & Controls (Desktop) */}
      <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end md:justify-start pl-8 md:pl-0">
        {/* Desktop Price */}
        <div className="hidden text-right md:block">
          <div className="text-lg font-bold text-slate-900">
            {formatIDR(item.product?.variant.price ?? 0)}
          </div>
        </div>

        {/* Quantity Controls & Delete */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onDelete(item.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Hapus Barang"
          >
            <Trash2 size={20} />
          </button>

          <div className="flex h-9 items-center rounded-full border border-slate-300 bg-white">
            <button
              onClick={() => onQuantityChange(item.id, -1)}
              disabled={item.quantity <= 1}
              className="flex h-full w-9 items-center justify-center rounded-l-full text-slate-600 hover:bg-slate-100 disabled:opacity-30"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-700">
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.id, 1)}
              disabled={
                !item.product || item.quantity >= item.product.variant.stock
              }
              className="flex h-full w-9 items-center justify-center rounded-r-full text-slate-600 hover:bg-slate-100 disabled:opacity-30"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
