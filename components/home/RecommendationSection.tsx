import React from "react";
import { ShoppingBag, Star } from "lucide-react";

// Mock Data
const PACKAGES = [
  { name: "Paket Hemat 1", price: 20000 },
  { name: "Paket Sembako", price: 55000 },
  { name: "Paket Anak Kost", price: 30000 },
];

export default function RecommendationSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Box 1: Buy Again (High Priority) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag size={20} className="text-blue-600" />
          <h2 className="font-bold text-lg text-gray-900">Beli Lagi</h2>
        </div>

        <div className="space-y-3">
          {PACKAGES.slice(0, 2).map((item, i) => (
            <PackageRow key={i} item={item} actionLabel="Beli Lagi" />
          ))}
        </div>
      </div>

      {/* Box 2: Recommendations */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Star size={20} className="text-orange-500" />
          <h2 className="font-bold text-lg text-gray-900">Rekomendasi</h2>
        </div>

        <div className="space-y-3">
          {PACKAGES.map((item, i) => (
            <PackageRow key={i} item={item} actionLabel="Cek" isSecondary />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Row Component for cleanliness
function PackageRow({ item, actionLabel, isSecondary }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition group">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
        <p className="text-gray-500 text-xs mt-0.5">
          Rp {item.price.toLocaleString()}
        </p>
      </div>
      <button
        className={`
        text-xs font-semibold px-4 py-2 rounded-lg transition
        ${
          isSecondary
            ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
        }
      `}
      >
        {actionLabel}
      </button>
    </div>
  );
}
