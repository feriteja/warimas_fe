"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* --------------------
 * MOCK DATA (replace with API later)
 * -------------------- */
const dashboardData = {
  kpis: [
    {
      key: "revenue",
      label: "Total Revenue",
      value: 125_000_000,
      prefix: "Rp ",
    },
    { key: "orders", label: "Orders", value: 1240 },
    { key: "sellers", label: "Sellers", value: 87 },
    { key: "products", label: "Products", value: 1560 },
  ],
  orderStats: [
    { key: "pending", label: "Pending", value: 42 },
    { key: "completed", label: "Completed", value: 1103 },
    { key: "cancelled", label: "Cancelled", value: 95 },
  ],
  revenueChart: [
    { month: "Jan", revenue: 12000000 },
    { month: "Feb", revenue: 15000000 },
    { month: "Mar", revenue: 18000000 },
    { month: "Apr", revenue: 22000000 },
    { month: "May", revenue: 25000000 },
  ],
};

/* --------------------
 * PAGE
 * -------------------- */
export default function AdminPage() {
  return (
    <div className="p-6 space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform analytics & performance overview
        </p>
      </header>

      {/* KPI CARDS */}
      <Suspense fallback={<SkeletonGrid />}>
        <KpiGrid />
      </Suspense>

      {/* CHART */}
      <Suspense fallback={<SkeletonChart />}>
        <RevenueSection />
      </Suspense>

      {/* ORDERS */}
      <Suspense fallback={<SkeletonGrid />}>
        <OrderSection />
      </Suspense>
    </div>
  );
}

/* --------------------
 * KPI GRID (CONFIG-DRIVEN)
 * -------------------- */
function KpiGrid() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.kpis.map((item, i) => (
          <AnimatedCard key={item.key} delay={i * 0.05}>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-semibold">
              {item.prefix}
              {item.value.toLocaleString("id-ID")}
            </p>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}

/* --------------------
 * REVENUE CHART
 * -------------------- */
function RevenueSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Revenue Trend</h2>

      <AnimatedCard>
        <div className="w-full ">
          <ResponsiveContainer
            width="100%"
            height={300}
            minWidth={1}
            minHeight={1}
            aspect={3}
          >
            <LineChart data={dashboardData.revenueChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </AnimatedCard>
    </section>
  );
}

/* --------------------
 * ORDER STATS
 * -------------------- */
function OrderSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {dashboardData.orderStats.map((item, i) => (
          <AnimatedCard key={item.key} delay={i * 0.05}>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}

/* --------------------
 * ANIMATED CARD
 * -------------------- */
function AnimatedCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border bg-card p-4 shadow-sm"
    >
      {children}
    </motion.div>
  );
}

/* --------------------
 * SKELETONS (SUSPENSE)
 * -------------------- */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}

function SkeletonChart() {
  return <div className="h-64 rounded-2xl bg-muted animate-pulse" />;
}
