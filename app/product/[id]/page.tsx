"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";

const product = {
  name: "Beras Premium Super 5kg",
  category: "Sembako",
  subcategory: "Beras",
  tags: ["premium", "organik", "5kg"],
  variants: [
    { id: 1, label: "5kg", price: 72000, stock: 12 },
    { id: 2, label: "10kg", price: 135000, stock: 5 },
  ],
  unit: "kg",
  description:
    "Beras premium berkualitas tinggi dengan tekstur pulen dan wangi alami. Cocok untuk konsumsi harian keluarga.",
  images: [
    "https://via.placeholder.com/600?text=Beras+1",
    "https://via.placeholder.com/600?text=Beras+2",
    "https://via.placeholder.com/600?text=Beras+3",
  ],
};

// interface Props {
//   params: Promise<{ id: string }>;
// }

function page() {
  // { params }: Props
  // const { id } = await params;
  // const router = useRouter();

  const [mainImage, setMainImage] = useState(
    "https://via.placeholder.com/600?text=Beras+1"
  );

  return (
    <div className="pb-28 max-w-7xl md:px-5 mx-auto mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1/3">
          {/* Main Image - smaller ratio */}
          <div className="w-full aspect-[4/3] relative bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full md:w h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-3 overflow-x-auto pb-1 px-1">
            {product.images.map((img) => (
              <button
                key={img}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden border relative transition flex-shrink-0 ${
                  mainImage === img ? "border-black" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt="Thumbnail"
                  fill
                  sizes="(max-width: 768px) 80px, 80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 flex-2/3 space-y-5">
          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
            <p className="text-sm text-gray-600">
              {product.category} • {product.subcategory}
            </p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <Badge key={tag} className="rounded-md px-2 py-1 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Variant Selector */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">Pilih Varian</h2>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  className="min-w-[110px] p-3 border rounded-xl text-left bg-white shadow-sm hover:bg-gray-50 transition space-y-1"
                >
                  <p className="font-medium text-sm">{v.label}</p>
                  <p className="text-xs text-gray-600">
                    Rp {v.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[10px] text-gray-500">Stock: {v.stock}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">Deskripsi</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 max-w-3xl mx-auto">
        <button className="flex-1 py-3 rounded-xl border text-sm font-medium hover:bg-gray-100 transition">
          Beli Sekarang
        </button>
        <button className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default page;
