import React, { useMemo } from "react";
import {
  Check,
  CreditCard,
  Package,
  Truck,
  Home,
  Clock,
  LucideIcon,
} from "lucide-react";
import { Order } from "@/types";

// --- Configuration ---

const STEP_FLOW = [
  "ORDER_PLACED",
  "PENDING_PAYMENT",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
] as const;

interface StepConfig {
  id: string;
  label: string;
  description: string; // Added description for vertical context
  icon: LucideIcon;
}

const STEPS: StepConfig[] = [
  {
    id: "ORDER_PLACED",
    label: "Pesanan Dibuat",
    description: "Pesanan Anda telah diterima",
    icon: Package,
  },
  {
    id: "PENDING_PAYMENT",
    label: "Pembayaran",
    description: "Menunggu konfirmasi",
    icon: CreditCard,
  },
  {
    id: "PROCESSING",
    label: "Diproses",
    description: "Kami sedang mengemas barang Anda",
    icon: Clock,
  },
  {
    id: "SHIPPED",
    label: "Dikirim",
    description: "Dalam perjalanan menuju Anda",
    icon: Truck,
  },
  {
    id: "DELIVERED",
    label: "Terkirim",
    description: "Paket telah diterima",
    icon: Home,
  },
];

// --- Helper Components ---

const VerticalStepNode = ({
  step,
  status,
  isLast,
}: {
  step: StepConfig;
  status: "completed" | "current" | "upcoming";
  isLast: boolean;
}) => {
  const Icon = step.icon;

  return (
    <div className="relative flex gap-6 pb-10 last:pb-0">
      {/* TRACK LINE
        We draw the line on every step EXCEPT the last one.
        We position it strictly relative to the icon column to ensure alignment.
      */}
      {!isLast && (
        <div
          className="absolute left-5 top-10 bottom-0 w-0.5 -ml-px bg-slate-200"
          aria-hidden="true"
        >
          {/* Progress Line Overlay: 
               If this step is completed, fill the line connecting to the next step.
            */}
          {status === "completed" && (
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 animate-in fade-in duration-1000 origin-top" />
          )}
        </div>
      )}

      {/* ICON COLUMN */}
      <div className="relative flex-shrink-0 flex items-start">
        <div
          className={`
            relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 
            transition-all duration-300 shadow-sm
            ${
              status === "completed"
                ? "bg-indigo-600 border-indigo-600 text-white"
                : status === "current"
                ? "bg-white border-indigo-600 text-indigo-600 ring-4 ring-indigo-50"
                : "bg-white border-slate-200 text-slate-300"
            }
          `}
        >
          {status === "completed" ? (
            <Check className="w-5 h-5" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* CONTENT COLUMN */}
      <div className="flex flex-col pt-1">
        <span
          className={`
            text-sm font-bold uppercase tracking-wide
            ${
              status === "current"
                ? "text-indigo-700"
                : status === "completed"
                ? "text-slate-800"
                : "text-slate-400"
            }
          `}
        >
          {step.label}
        </span>
        <span className="text-sm text-slate-500 mt-1">{step.description}</span>
      </div>
    </div>
  );
};

// --- Main Component ---

function HeaderProgressTrackVertical({ order }: { order: Order }) {
  // Logic: Calculate active index
  const activeIndex = useMemo(() => {
    const index = STEP_FLOW.indexOf(order.status as any);
    return index === -1 ? 0 : index;
  }, [order.status]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-slate-50/50 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Detail Pelacakan</h2>
        <p className="text-slate-500 text-xs mt-1">ID: {order.externalId}</p>
      </div>

      {/* Timeline Body */}
      <div className="p-8">
        {STEPS.map((step, index) => {
          const status =
            index < activeIndex
              ? "completed"
              : index === activeIndex
              ? "current"
              : "upcoming";

          return (
            <VerticalStepNode
              key={step.id}
              step={step}
              status={status}
              isLast={index === STEPS.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HeaderProgressTrackVertical;
