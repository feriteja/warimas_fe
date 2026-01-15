"use client";

import { showLoadingToast, showSuccessToast } from "@/lib/toast";
import { updateOrderStatus } from "@/services/order.service";
import { OrderStatus } from "@/types";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ActionButton({
  children,
  variant = "outline",
  icon,
  href,
  changeStatus,
  orderId,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "danger";
  icon?: React.ReactNode;
  href?: string;
  changeStatus?: OrderStatus;
  orderId?: number;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = () => {
    if (!changeStatus || !orderId) return;
    const showToast = showLoadingToast(
      "Memperbarui status...",
      `Order dengan id ${orderId}`
    );

    startTransition(async () => {
      await updateOrderStatus({
        orderId,
        status: changeStatus,
      });
      toast.dismiss(showToast);
      showSuccessToast(
        "Berhasil memperbarui status",
        `Order dengan id ${orderId} berhasil diperbarui ke status ${changeStatus}`,
        <Check />
      );
      router.refresh();
    });
  };

  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-[0.98]";
  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
    outline:
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
    danger:
      "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300",
  };

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={() => handleStatusChange()}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-blue-600" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
