import { ProductType, VariantType } from "@/types";
import { Heart } from "lucide-react";

interface ProductInfoProps {
  product: ProductType;
  selectedVariant: VariantType | null;
  setSelectedVariant: (v: VariantType) => void;
  setQty: (q: number) => void;
  price: number;
}

export function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
  setQty,
  price,
}: ProductInfoProps) {
  const variants = product.variants ?? [];

  return (
    <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-8">
      <div>
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 uppercase tracking-wider">
              {product.subcategoryName || "Product"}
            </span>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-red-500">
              <Heart size={20} />
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            {product.name}
          </h1>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              Rp {price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-slate-100 my-6" />

        {/* Variants */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-900 mb-3 block">
              Pilih Varian
            </label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                const isDisabled = v.stock <= 0;
                return (
                  <button
                    key={v.id}
                    disabled={isDisabled}
                    onClick={() => {
                      setSelectedVariant(v);
                      setQty(1);
                    }}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                      ${
                        isSelected
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }
                      ${
                        isDisabled
                          ? "opacity-40 cursor-not-allowed bg-slate-50 border-slate-100 decoration-slate-400"
                          : ""
                      }
                    `}
                  >
                    {v.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
