"use client"; // Needed for the 'Show More' interaction

import React, { useState } from "react";
import { LayoutGrid, ChevronDown, ChevronUp } from "lucide-react";

const CATEGORIES = [
  "Sembako",
  "Makanan Instan",
  "Minuman",
  "Bumbu & Kecap",
  "Kebersihan",
  "Perawatan Tubuh",
  "Kebutuhan Bayi",
  "Frozen Food",
  "Rokok & Aksesoris",
  "Alat Rumah Tangga",
  "Obat & Kesehatan",
  "Pulsa & Layanan",
];

export default function CategoriesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // UX Decision:
  // On mobile/initial view, only show the first 8 items (2 rows of 4, or 3 rows of 3).
  // This prevents the section from taking up the whole screen.
  const visibleCategories = isExpanded ? CATEGORIES : CATEGORIES.slice(0, 6);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 rounded-md text-emerald-600">
            <LayoutGrid size={18} />
          </div>
          <h2 className="font-bold text-gray-800 text-lg">Kategori</h2>
        </div>

        {/* Optional: Show count */}
        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
          {CATEGORIES.length} Items
        </span>
      </div>

      {/* THE GRID 
        grid-cols-2: Mobile (2 items per row) - easy to tap
        sm:grid-cols-3: Small Tablets
        md:grid-cols-4: Tablet/Desktop
        lg:grid-cols-6: Large Screens
      */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {visibleCategories.map((cat, i) => (
          <button
            key={i}
            className="
              flex items-center justify-center
              h-12 w-full
              px-2
              text-xs sm:text-sm font-medium text-gray-600
              bg-gray-50 border border-gray-100 rounded-lg
              hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200
              active:scale-95
              transition-all duration-200
              text-center leading-tight
            "
          >
            {cat}
          </button>
        ))}
      </div>

      {/* "Show More" Button - Only appears if we have more items hidden */}
      {!isExpanded && CATEGORIES.length > 6 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="
              flex items-center gap-1.5 
              text-xs font-semibold text-gray-500 
              hover:text-emerald-600 transition-colors
              py-2 px-4 rounded-full hover:bg-gray-50
            "
          >
            Lihat Semua <ChevronDown size={14} />
          </button>
        </div>
      )}

      {/* "Show Less" Button - Optional, if you want to let them collapse it back */}
      {isExpanded && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(false)}
            className="
              flex items-center gap-1.5 
              text-xs font-semibold text-gray-500 
              hover:text-emerald-600 transition-colors
              py-2 px-4 rounded-full hover:bg-gray-50
            "
          >
            Tutup <ChevronUp size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
