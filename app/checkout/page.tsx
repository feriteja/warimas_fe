// --- CHECKOUT FLOW OVERVIEW ---
// 1. /cart → User presses Checkout → go to /checkout
// 2. /checkout → User reviews selected items, address, shipping, payment method → Confirm Order
// 3. /checkout/success → Order success page

// --- CHECKOUT PAGE COMPONENT ---
"use client";
import Image from "next/image";
import { useState } from "react";

// Dummy data for checkout
const dummy = [
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
    price: 18000,
    qty: 2,
    img: "https://via.placeholder.com/200/200?2",
  },
];

export default function CheckoutPage() {
  const [items] = useState(dummy);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-xl font-bold mb-2">Checkout</h1>

      {/* ORDER ITEMS */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Barang yang dibeli</h2>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b pb-4 last:border-none"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-green-600 font-bold">
                  Rp {item.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Alamat Pengiriman</h2>
        <p className="text-gray-700">Feri Teja Kusuma</p>
        <p className="text-gray-600 text-sm">
          Jl. Contoh Alamat No. 123, Jakarta
        </p>
        <button className="text-green-600 text-sm font-semibold mt-2">
          Ubah
        </button>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Metode Pembayaran</h2>
        <select className="border rounded-lg p-2 w-full">
          <option>Bank Transfer</option>
          <option>COD</option>
          <option>E-Wallet</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <h2 className="text-lg font-semibold mb-3">Ringkasan Pembayaran</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Ongkir</span>
          <span>Rp 10.000</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rp {(total + 10000).toLocaleString()}</span>
        </div>

        <button
          className="mt-4 w-full py-3 rounded-lg bg-green-600 text-white font-semibold"
          onClick={() => (window.location.href = "/checkout/success")}
        >
          Buat Pesanan
        </button>
      </div>
    </div>
  );
}
