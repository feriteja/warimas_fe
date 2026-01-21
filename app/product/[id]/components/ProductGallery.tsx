import { SafeImage } from "@/components/SafeImage";
import { ProductType, VariantType } from "@/types";
import { Store } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import placeHolder from "../../../../public/images/placeholder-product.png";

interface ProductGalleryProps {
  product: ProductType;
  selectedVariant: VariantType | null;
  setSelectedVariant: (v: VariantType | null) => void;
  isOutOfStock: boolean;
}

export function ProductGallery({
  product,
  selectedVariant,
  setSelectedVariant,
  isOutOfStock,
}: ProductGalleryProps) {
  const variants = product.variants ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  const mainImage = useMemo(
    () => selectedVariant?.imageUrl || product.imageUrl || placeHolder,
    [selectedVariant?.imageUrl, product.imageUrl],
  );

  // Auto-scroll thumbnails to keep selected variant in view
  useEffect(() => {
    if (selectedVariant && scrollRef.current) {
      const activeNode = scrollRef.current.querySelector(
        `[data-variant-id="${selectedVariant.id}"]`,
      );
      if (activeNode) {
        activeNode.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [selectedVariant]);

  return (
    <div className="lg:col-span-4 space-y-4">
      <div className="space-y-4">
        <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group">
          <SafeImage
            key={typeof mainImage === "string" ? mainImage : placeHolder.src}
            src={mainImage}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white/90 text-slate-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl">
                Stok Habis
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {variants.length > 1 && (
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {variants.map((v) => (
              <button
                aria-pressed={selectedVariant?.id === v.id}
                key={v.id}
                data-variant-id={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`
                      relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border
                      ${
                        selectedVariant?.id === v.id
                          ? "ring-2 ring-slate-900 ring-offset-2 opacity-100 border-transparent"
                          : "opacity-70 hover:opacity-100 border-slate-200"
                      }
                    `}
              >
                <SafeImage
                  src={v.imageUrl || placeHolder}
                  alt={v.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Seller Info */}
      <div className="hidden lg:flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
          <Store size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900 text-lg">
              {product.sellerName || "Official Store"}
            </p>
            <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Official
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Online • Jakarta Pusat
          </p>
        </div>
        <button className="ml-auto text-slate-900 font-bold text-sm hover:underline">
          Kunjungi Toko
        </button>
      </div>
    </div>
  );
}
