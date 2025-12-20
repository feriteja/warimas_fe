"use client";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Produk Premium A",
      price: 120000,
      img: "https://via.placeholder.com/300/300?text=A",
    },
    {
      id: 2,
      name: "Produk Bagus B",
      price: 98000,
      img: "https://via.placeholder.com/300/300?text=B",
    },
    {
      id: 3,
      name: "Produk C",
      price: 45000,
      img: "https://via.placeholder.com/300/300?text=C",
    },
  ]);

  const removeItem = (id: any) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-xl font-bold mb-2">Wishlist</h1>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Heart size={60} className="mb-4 opacity-40" />
          <p className="text-lg font-semibold">Belum ada wishlist</p>
          <p className="text-sm">Produk yang kamu sukai akan muncul di sini</p>
        </div>
      )}

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border p-3 flex flex-col gap-3 hover:shadow-md transition cursor-pointer group"
          >
            {/* Image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition"
              />

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                <Heart size={18} fill="currentColor" />
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800 line-clamp-1">
                {item.name}
              </p>
              <p className="text-green-600 font-bold text-sm">
                Rp {item.price.toLocaleString()}
              </p>
            </div>

            {/* Button */}
            <button className="w-full mt-auto py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
