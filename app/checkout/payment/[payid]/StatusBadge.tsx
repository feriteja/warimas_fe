import { PaymentStatus } from "@/types";

const statusStyles: Record<PaymentStatus, string> = {
  REQUIRES_ACTION: "text-yellow-700 bg-yellow-50 ring-yellow-600/20",
  PAID: "text-green-700 bg-green-50 ring-green-600/20",
  FAILED: "text-red-700 bg-red-50 ring-red-600/20",
  EXPIRED: "text-gray-700 bg-gray-50 ring-gray-600/20",
};

export const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  let statusText = status;
  if (status === "REQUIRES_ACTION") statusText = "Menunggu Pembayaran";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      {statusText}
    </span>
  );
};
