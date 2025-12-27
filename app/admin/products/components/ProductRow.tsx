import Image from "next/image";
import { ProductType } from "@/types";
import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ProductRow({ product }: { product: ProductType }) {
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    product.imageUrl && product.imageUrl.trim() !== "" && !imgError
      ? product.imageUrl
      : "/images/placeholder-product.png";

  return (
    <div className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition">
      {/* Image */}
      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImageOff className="text-gray-400" size={24} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{product.name}</p>
        <p className="text-sm text-gray-500 truncate">{product.sellerName}</p>
      </div>

      {/* Status */}
      <span
        className={`px-3 py-1 text-sm rounded-xl border capitalize
          ${
            product.status === "active"
              ? "bg-green-50 text-green-700 border-green-300"
              : product.status === "hidden"
              ? "bg-yellow-50 text-yellow-700 border-yellow-300"
              : "bg-red-50 text-red-700 border-red-300"
          }`}
      >
        {product.status}
      </span>
    </div>
  );
}
