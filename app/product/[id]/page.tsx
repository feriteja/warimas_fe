import { AddToCartButton } from "@/components/AddToCartButton";
import { getProductById } from "./action";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <Link
          href={`/admin/edit-product/${product.id}`}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Edit Product
        </Link>
      </div>

      {product.description && (
        <p className="text-gray-600 mb-6">{product.description}</p>
      )}

      <div className="space-y-4">
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className="border rounded-md p-4 shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{variant.name}</h3>
              <p className="text-sm text-gray-500">
                {variant.quantityType} — Stock: {variant.stock}
              </p>
              <p className="text-md font-medium text-green-700">
                Rp {variant.price.toLocaleString("id-ID")}
              </p>
            </div>
            <AddToCartButton product={product} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
}
