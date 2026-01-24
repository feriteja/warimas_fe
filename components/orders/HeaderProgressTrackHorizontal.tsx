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

// --- Configuration & Types ---

// Define the logical flow of your order statuses
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
  icon: LucideIcon;
}

const STEPS: StepConfig[] = [
  { id: "PENDING_PAYMENT", label: "Pembayaran", icon: CreditCard },
  { id: "PAID", label: "Dibayar", icon: Check },
  { id: "ACCEPTED", label: "Diproses", icon: Package },
  { id: "SHIPPED", label: "Dikirim", icon: Truck },
  { id: "COMPLETED", label: "Selesai", icon: Home },
];

// --- Helper Components ---

/**
 * Individual Step Node
 * Handles the visual state (Completed, Current, Upcoming) internally
 */
const StepNode = ({
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
    <div className="relative flex flex-col items-center group z-10">
      {/* Icon Circle */}
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center border-2 
          transition-all duration-500 ease-out shadow-sm
          ${
            status === "completed"
              ? "bg-emerald-600 border-emerald-600 text-white scale-100"
              : status === "current"
                ? "bg-white border-emerald-600 text-emerald-600 scale-110 ring-4 ring-emerald-50"
                : "bg-white border-slate-200 text-slate-300"
          }
        `}
      >
        {status === "completed" ? (
          <Check className="w-5 h-5 animate-in fade-in zoom-in duration-300" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>

      {/* Label */}
      <span
        className={`
          absolute top-14 text-xs font-bold uppercase tracking-wider whitespace-nowrap
          transition-colors duration-300
          ${
            status === "current"
              ? "text-emerald-700"
              : status === "completed"
                ? "text-slate-700"
                : "text-slate-400"
          }
        `}
      >
        {step.label}
      </span>
    </div>
  );
};

// --- Main Component ---

function HeaderProgressTrackHorizontal({ order }: { order: Order }) {
  // Logic: Calculate current step index and progress percentage
  const progressState = useMemo(() => {
    // Handle 'COMPLETED' status explicitly. When an order is 'COMPLETED',
    // it signifies that all steps have been finished.
    if (order.status === "COMPLETED") {
      return {
        // By setting activeIndex to the total number of steps, all steps will be marked as 'completed'.
        activeIndex: STEPS.length,
        progressPercentage: 100,
      };
    }

    // Find the index of the order's current status in our flow definition
    const currentIndex = STEP_FLOW.indexOf(order.status as any);
    // Ensure we handle cases where status might not match (fallback to 0)
    const activeIndex = currentIndex === -1 ? 0 : currentIndex;

    // Calculate percentage for the progress bar width
    const progressPercentage = (activeIndex / (STEPS.length - 1)) * 100;

    return { activeIndex, progressPercentage };
  }, [order.status]);

  // Format Date professionally
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(order?.timestamps?.createdAt || Date.now()));

  return (
    <div className="w-full  mx-auto">
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Pesanan{" "}
              <span className="text-emerald-600">#{order.externalId}</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Dipesan pada {formattedDate}
            </p>
          </div>
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
            <span className="text-xs text-slate-400 font-mono">
              ID: {order.externalId}
            </span>
          </div>
        </div>

        {/* Progress Tracker Section */}
        <div className="p-8 pb-16">
          {" "}
          {/* Extra padding bottom for labels */}
          <div className="relative">
            {/* Background Track (Gray Line) */}
            <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 rounded-full -z-10" />

            {/* Active Track (Colored Line) - Dynamic Width */}
            <div
              className="absolute top-5 left-0 h-1 bg-emerald-600 rounded-full -z-10 transition-all duration-700 ease-in-out"
              style={{ width: `${progressState.progressPercentage}%` }}
            />

            {/* Steps Row */}
            <div className="flex justify-between w-full">
              {STEPS.map((step, index) => {
                const status =
                  index < progressState.activeIndex
                    ? "completed"
                    : index === progressState.activeIndex
                      ? "current"
                      : "upcoming";

                return (
                  <StepNode
                    key={step.id}
                    step={step}
                    status={status}
                    isLast={index === STEPS.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderProgressTrackHorizontal;
