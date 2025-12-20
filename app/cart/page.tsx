"use client";
import Image from "next/image";
import { useState } from "react";
import { Heart, Square, SquareCheck } from "lucide-react";

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
  {
    id: 3,
    name: "Product Tiga",
    price: 9000,
    qty: 1,
    img: "https://via.placeholder.com/200/200?3",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(dummy);
  const [selected, setSelected] = useState<any>([]);

  const toggleSelect = (id: any) => {
    setSelected((prev: any) =>
      prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id]
    );
  };

  const total = items
    .filter((i: any) => selected.includes(i.id))
    .reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 flex flex-col md:flex-row gap-6">
      {/* LEFT - CART LIST */}
      <div className="flex-1 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white rounded-xl p-4 flex gap-4 shadow-sm border"
          >
            {/* checkbox */}
            <button onClick={() => toggleSelect(item.id)} className="mt-2">
              {selected.includes(item.id) ? (
                <SquareCheck className="text-green-600" />
              ) : (
                <Square className="text-gray-400" />
              )}
            </button>

            {/* IMAGE */}
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-green-600 font-bold mt-1">
                  Rp {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                <Heart className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDEBAR (DESKTOP/TABLET) */}
      <div className="hidden md:flex flex-col w-80 h-fit bg-white rounded-xl shadow-sm border p-4 sticky top-8">
        <h3 className="text-lg font-semibold mb-3">Ringkasan Belanja</h3>
        <p className="text-gray-600 mb-2">Total</p>
        <p className="text-2xl font-bold text-green-600 mb-4">
          Rp {total.toLocaleString()}
        </p>
        <button
          disabled={total === 0}
          className="w-full py-3 rounded-lg text-white font-semibold bg-green-600 disabled:bg-gray-300"
        >
          Checkout
        </button>
      </div>

      {/* MOBILE FIXED CHECKOUT */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-green-600">
            Rp {total.toLocaleString("id-ID")}
          </p>
        </div>
        <button
          disabled={total === 0}
          className="px-6 py-3 rounded-lg text-white font-semibold bg-green-600 disabled:bg-gray-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
