"use client";
import ShippingStatus from "@/components/ShippingStatus";
import Image from "next/image";

// Dummy one-order detail example
const order = {
  id: "ORD-2024-001",
  date: "2024-10-12",
  status: "Selesai",
  address: "Jl. Contoh Alamat No. 123, Jakarta",
  paymentMethod: "Bank Transfer",
  shipping: "JNE Reguler",
  shippingCost: 10000,
  items: [
    {
      id: 1,
      name: "Product Satu",
      price: 12000,
      qty: 1,
      img: "https://via.placeholder.com/200/200?1",
    },
    {
      id: 2,
      name: "Product Dua",
      price: 20000,
      qty: 2,
      img: "https://via.placeholder.com/200/200?2",
    },
  ],
};

const timeline = [
  { title: "Pesanan Dibuat", date: "12 Okt 2024 • 09:13" },
  { title: "Dikemas", date: "12 Okt 2024 • 12:40" },
  { title: "Dikirim", date: "13 Okt 2024 • 08:22" },
  { title: "Selesai", date: "14 Okt 2024 • 15:33" },
];
export default function OrderDetailPage() {
  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal + order.shippingCost;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-xl font-bold mb-2">Detail Pesanan</h1>

      {/* ORDER HEADER */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Order ID: {order.id}</p>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full font-semibold
              ${
                order.status === "Selesai"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* TRACKING TIMELINE */}
      <ShippingStatus timeline={timeline} />

      {/* SHIPPING INFO */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Informasi Pengiriman</h2>
        <p className="text-gray-700 mb-1">{order.address}</p>
        <p className="text-sm text-gray-500">Kurir: {order.shipping}</p>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Metode Pembayaran</h2>
        <p className="text-gray-700">{order.paymentMethod}</p>
      </div>

      {/* ITEMS */}
      <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-3">Barang</h2>
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-b pb-4 last:border-none"
          >
            <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-green-600 font-bold text-sm">
                Rp {item.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Ringkasan Pembayaran</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>Rp {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Ongkir</span>
          <span>Rp {order.shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="flex justify-end">
        <button className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold">
          Unduh Invoice
        </button>
      </div>
    </div>
  );
}
