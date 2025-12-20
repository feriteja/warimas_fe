"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Package,
  Truck,
  CheckCircle,
  CircleX,
} from "lucide-react";

// Mock example
const MOCK_ORDER = {
  id: "ORD-12345",
  date: "2025-09-01 14:30",
  paymentMethod: "Transfer Bank",
  status: "incoming",

  buyer: { name: "Feri Teja", phone: "081234567890" },
  seller: { name: "Warimas Official Store" },
  address: "Jl. Kenanga No. 12, Jakarta Selatan",

  items: [
    { id: 1, name: "Indomie Goreng", qty: 3, price: 3500 },
    { id: 2, name: "Ultra Milk", qty: 2, price: 7500 },
    { id: 3, name: "Kopi Kapal Api", qty: 1, price: 5000 },
  ],
  shippingCost: 12000,

  timeline: [
    { status: "incoming", label: "Pesanan masuk", date: "2025-09-01 14:30" },
  ],
};

export default function OrderDetail({ params }: any) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrder(MOCK_ORDER);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <SkeletonOrderDetail />;

  const subtotal = order.items.reduce(
    (s: number, item: any) => s + item.price * item.qty,
    0
  );

  const total = subtotal + order.shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeft size={18} /> Kembali
      </Link>

      <h1 className="text-2xl font-semibold mb-5">Detail Pesanan</h1>

      {/* ----------------------------------------------------
         HEADER — SMALL SINGLE CARD
      -----------------------------------------------------*/}
      <div className="bg-white p-5 rounded-xl border shadow-sm mb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-semibold">{order.id}</p>
          </div>

          <div className="text-right text-sm text-gray-500">
            <p>{order.date}</p>
            <p className="mt-1">{order.paymentMethod}</p>
          </div>
        </div>

        <div className="mt-4">
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* ----------------------------------------------------
         MAIN CONTENT — SINGLE LARGE CARD WITH DIVIDERS
      -----------------------------------------------------*/}
      <div className="bg-white p-6 rounded-xl border shadow-sm mb-6 space-y-6">
        {/* Buyer + Seller */}
        <section>
          <h2 className="font-semibold mb-2">Informasi Pembeli</h2>
          <p className="font-medium">{order.buyer.name}</p>
          <p className="text-sm text-gray-500">{order.buyer.phone}</p>
        </section>

        <div className="border-b" />

        <section>
          <h2 className="font-semibold mb-2">Informasi Penjual</h2>
          <p className="font-medium">{order.seller.name}</p>
        </section>

        <div className="border-b" />

        <section>
          <h2 className="font-semibold mb-2">Alamat Pengiriman</h2>
          <p>{order.address}</p>
        </section>

        <div className="border-b" />

        {/* Items */}
        <section>
          <h2 className="font-semibold mb-4">Barang Pesanan</h2>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center pb-3 border-b"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.qty} × Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <p className="font-semibold">
                  Rp {(item.qty * item.price).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-b" />

        {/* Summary */}
        <section>
          <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>Rp {subtotal.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between">
              <p>Ongkir</p>
              <p>Rp {order.shippingCost.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <p>Total</p>
              <p>Rp {total.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </section>
      </div>

      {/* ----------------------------------------------------
         ACTION + TIMELINE (2 columns in ONE card)
      -----------------------------------------------------*/}
      <div className="bg-white p-6 rounded-xl border shadow-sm grid md:grid-cols-2 gap-6">
        {/* Actions */}
        <div>
          <h2 className="font-semibold mb-4">Aksi Admin</h2>
          <div className="flex gap-3 flex-wrap">
            <ActionButton label="Proses" color="black" />
            <ActionButton label="Kirim" color="blue" />
            <ActionButton label="Selesai" color="green" />
            <ActionButton label="Batalkan" color="red" />
            <ActionButton label="Retur" color="yellow" />
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-semibold mb-4">Riwayat Status</h2>
          <div className="space-y-4">
            {order.timeline.map((t: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <TimelineIcon status={t.status} />
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   COMPONENTS
------------------------------------------------------- */

function StatusBadge({ status }: any) {
  const classMap: any = {
    incoming: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    shipped: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${classMap[status]}`}
    >
      {status}
    </span>
  );
}

function ActionButton({ label, color = "gray" }: any) {
  const map: any = {
    black: "bg-black text-white hover:bg-gray-800",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    green: "bg-green-600 text-white hover:bg-green-700",
    red: "bg-red-600 text-white hover:bg-red-700",
    yellow: "bg-yellow-500 text-white hover:bg-yellow-600",
    gray: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${map[color]}`}
    >
      {label}
    </button>
  );
}

function TimelineIcon({ status }: any) {
  const icons: any = {
    incoming: <Clock size={20} className="text-blue-600" />,
    processing: <Package size={20} className="text-yellow-600" />,
    shipped: <Truck size={20} className="text-purple-600" />,
    completed: <CheckCircle size={20} className="text-green-600" />,
    canceled: <CircleX size={20} className="text-red-600" />,
  };

  return <div>{icons[status]}</div>;
}

function SkeletonOrderDetail() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-32 bg-gray-200 rounded-xl" />
      <div className="h-96 bg-gray-200 rounded-xl" />
      <div className="h-48 bg-gray-200 rounded-xl" />
    </div>
  );
}
