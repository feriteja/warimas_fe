import { ProductType } from "@/types";
import Link from "next/link";
import productPlaceHolder from "../../public/images/placeholder-product.png";
import { SafeImage } from "../SafeImage";

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  // Logic
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const isOutOfStock = totalStock <= 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className={`
        group relative block bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        ${isOutOfStock ? "opacity-75 grayscale" : ""}
      `}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <SafeImage
          src={productPlaceHolder} // Replace with product.image if available
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-bold px-2 py-1 bg-red-600 rounded">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        <div className="flex items-center text-xs text-gray-500 gap-1">
          {/* You can add a shop icon here */}
          <span className="truncate max-w-[150px]">{product.sellerName}</span>
        </div>

        <div className="pt-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Mulai dari</span>
            <span className="font-bold text-emerald-600">
              Rp {lowestPrice.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Optional: Add button icon */}
          <div className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold">+ Keranjang</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
