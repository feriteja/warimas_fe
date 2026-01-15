"use client";

import { Order, OrderStatus } from "@/types";
import { updateOrderStatus } from "../actions";
import { useState, useTransition } from "react";
import {
  Calendar,
  MapPin,
  Package,
  User,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  XCircle,
  Clock,
} from "lucide-react";
import { ADMIN_ORDER_STATUSES } from "./client";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function OrderCard({ order }: { order: Order }) {
  const [isPending, startTransition] = useTransition();
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (newStatus === order.status) return;

    setIsStatusOpen(false);
    startTransition(async () => {
      await updateOrderStatus(order.id, newStatus);
    });
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm text-blue-600">
            <Package size={20} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-bold text-gray-900 tracking-tight">
                #{order.invoiceNumber || order.externalId}
              </span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Calendar size={14} />
              <span>{formatDate(order.timestamps.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
              Total Pembayaran
            </p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(order.pricing.total)}
            </p>
          </div>

          {/* Status Action Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-70 transition-all"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Ubah Status"
              )}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isStatusOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isStatusOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsStatusOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-1 animate-in fade-in zoom-in-95 duration-100">
                  {ADMIN_ORDER_STATUSES.filter((s) => s.key !== "ALL").map(
                    (status) => (
                      <button
                        key={status.key}
                        onClick={() =>
                          handleStatusChange(status.key as OrderStatus)
                        }
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                          order.status === status.key
                            ? "text-blue-600 font-medium bg-blue-50"
                            : "text-gray-700"
                        }`}
                      >
                        {status.label}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User size={18} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Informasi Pembeli
              </p>
              <p className="text-sm text-gray-500">ID: {order.user.id}</p>
              {/* Add email/name if available in type */}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Alamat Pengiriman
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-1">
                {order.shipping.address.addressLine1}
                {order.shipping.address.city &&
                  `, ${order.shipping.address.city}`}
                {order.shipping.address.postalCode &&
                  ` ${order.shipping.address.postalCode}`}
              </p>
            </div>
          </div>
        </div>

        {/* Items Preview */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Item Pesanan
          </p>
          <div className="space-y-3">
            {order.items.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-700 truncate pr-4">
                  {item.variant.productName} - {item.variant.name}
                </span>
                <span className="text-gray-900 font-medium whitespace-nowrap">
                  x{item.quantity}
                </span>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-xs text-blue-600 font-medium pt-1">
                +{order.items.length - 3} item lainnya
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING_PAYMENT: "bg-amber-50 text-amber-700 border-amber-200",
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ACCEPTED: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    COMPLETED: "bg-slate-50 text-slate-700 border-slate-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
