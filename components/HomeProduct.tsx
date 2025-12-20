import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightCircle } from "lucide-react";

const categories = [
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

const dummyProducts = (category: string) => {
  return Array.from({ length: 4 }).map((_, i) => ({
    id: `${category}-${i}`,
    name: `${category} Product ${i + 1}`,
    price: (Math.random() * 50 + 5).toFixed(0),
    img: `https://via.placeholder.com/400x250?text=${encodeURIComponent(
      category
    )}`,
  }));
};

export default function CategoriesPage() {
  return (
    <div className="p-3 space-y-16 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {categories.map((cat) => (
        <section key={cat} className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold border-l-4 border-black pl-4">
              {cat}
            </h2>
            <p className="underline">Lihat lebih banyak</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {dummyProducts(cat).map((p) => (
              <div key={p.id}>
                <div className="rounded-xl cursor-pointer shadow-sm bg-white/60 backdrop-blur-xl border border-white/30 hover:shadow-md transition duration-300">
                  <div className="p-3 space-y-2">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-36 object-cover hover:scale-110 transition duration-500"
                      />
                    </div>
                    <h3 className="text-md leading-tight ">{p.name}</h3>
                    <p className="text-md  font-semibold text-gray-700 ">
                      Rp {p.price}.000
                    </p>
                    <button className="w-full py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-xl cursor-pointer flex flex-col justify-center items-center shadow-sm bg-white/60 backdrop-blur-xl border border-white/30 hover:shadow-md transition duration-300">
              <ChevronRightCircle size={50} />
              <h3>Lebih Banyak</h3>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
