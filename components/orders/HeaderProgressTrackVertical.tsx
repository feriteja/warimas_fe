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
  "PENDING_PAYMENT",
  "PAID",
  "ACCEPTED",
  "SHIPPED",
  "COMPLETED",
] as const;

interface StepConfig {
  id: string;
  label: string;
  description: string; // Added description for vertical context
  icon: LucideIcon;
}

const STEPS: StepConfig[] = [
  {
    id: "PENDING_PAYMENT",
    label: "Pembayaran",
    description: "Menunggu pembayaran",
    icon: CreditCard,
  },
  {
    id: "PAID",
    label: "Dibayar",
    description: "Pembayaran diterima",
    icon: Check,
  },
  {
    id: "ACCEPTED",
    label: "Diproses",
    description: "Pesanan sedang diproses",
    icon: Package,
  },
  {
    id: "SHIPPED",
    label: "Dikirim",
    description: "Dalam perjalanan",
    icon: Truck,
  },
  {
    id: "COMPLETED",
    label: "Selesai",
    description: "Pesanan telah diterima",
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
            <div className="absolute top-0 left-0 w-full h-full bg-emerald-600 animate-in fade-in duration-1000 origin-top" />
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
                ? "bg-emerald-600 border-emerald-600 text-white"
                : status === "current"
                  ? "bg-white border-emerald-600 text-emerald-600 ring-4 ring-emerald-50"
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
                ? "text-emerald-700"
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
    if (order.status === "COMPLETED") return STEPS.length;
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
