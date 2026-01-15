"use client";

import { OrderStatus } from "@/types";
// import { updateOrderStatus } from "../../actions";
import { useState, useTransition } from "react";
import { Loader2, Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/services/order.service";
import { showLoadingToast, showSuccessToast } from "@/lib/toast";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { key: OrderStatus.PENDING_PAYMENT, label: "Menunggu Pembayaran" },
  { key: OrderStatus.PAID, label: "Sudah Dibayar" },
  { key: OrderStatus.ACCEPTED, label: "Pesanan Diproses" },
  { key: OrderStatus.SHIPPED, label: "Sedang Dikirim" },
  { key: OrderStatus.COMPLETED, label: "Selesai" },
  { key: OrderStatus.CANCELLED, label: "Dibatalkan" },
];

export function StatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: number;
  currentStatus: OrderStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (newStatus === currentStatus) return;
    const showToast = showLoadingToast(
      "Memperbarui status...",
      `Order dengan id ${orderId}`
    );

    setIsOpen(false);
    startTransition(async () => {
      await updateOrderStatus({
        orderId,
        status: newStatus,
      });
      toast.dismiss(showToast);
      showSuccessToast(
        "Berhasil memperbarui status",
        `Order dengan id ${orderId} berhasil diperbarui ke status ${newStatus}`,
        <Check />
      );
      router.refresh();
    });
  };

  const currentLabel =
    STATUS_OPTIONS.find((s) => s.key === currentStatus)?.label || currentStatus;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-70"
      >
        <div className="flex items-center gap-2">
          {isPending ? (
            <Loader2 size={16} className="animate-spin text-blue-600" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          )}
          <span>{isPending ? "Memperbarui..." : currentLabel}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {STATUS_OPTIONS.map((option) => {
              const isSelected = currentStatus === option.key;
              return (
                <button
                  key={option.key}
                  onClick={() => handleStatusChange(option.key)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                  {isSelected && <Check size={14} className="text-blue-600" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
