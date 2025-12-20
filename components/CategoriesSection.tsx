import React from "react";

const Category = [
  "Sembako",
  "Makanan Instan",
  "Minuman",
  "Bumbu & Kecap",
  "Kebersihan Rumah",
  "Perawatan Tubuh",
  "Kebutuhan Bayi",
  "Frozen Food",
  "Rokok & Aksesoris",
  "Alat Rumah Tangga",
  "Obat & Kesehatan",
  "Pulsa & Layanan",
];
function CategoriesSection() {
  return (
    <div className="flex overflow-x-auto ">
      <div
        className="
            flex-shrink-0
            bg-linear-to-tl
            from-green-300 to-[#6ab880] 
            shadow-sm
             px-4 py-3
            min-w-[110px]
            flex items-center justify-center
            text-sm font-medium
            cursor-pointer
            transition
            hover:bg-gray-100 hover:shadow
            active:scale-95
          "
      >
        <h2>Kategori</h2>
      </div>
      {Category.map((cat, i) => (
        <div
          key={i}
          className="
            flex-shrink-0
            bg-white
            shadow-sm
            px-4 py-3
            min-w-[110px]
            flex items-center justify-center
            text-sm font-medium
            cursor-pointer
            transition
            hover:bg-gray-100 hover:shadow
            active:scale-95
          "
        >
          {cat}
        </div>
      ))}
    </div>
  );
}

export default CategoriesSection;
