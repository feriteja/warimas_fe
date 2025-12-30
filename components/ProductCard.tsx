import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import productPlaceHolder from "../public/images/placeholder-product.png";

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 space-y-2"
    >
      <Image
        src={productPlaceHolder}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-lg object-cover"
      />

      <h3 className="font-medium line-clamp-2">{product.name}</h3>

      <p className="text-sm text-gray-500">{product.sellerName}</p>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-primary">
          Rp {lowestPrice.toLocaleString("id-ID")}
        </span>

        <span
          className={`text-xs ${
            totalStock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {totalStock > 0 ? "In stock" : "Out of stock"}
        </span>
      </div>
    </Link>
  );
}
