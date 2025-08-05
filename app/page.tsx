// app/page.tsx
"use client";

import HeroWithCarousel from "@/components/HeroWithCarousel";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:py-4">
      <HeroWithCarousel />
      {/* products */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))} */}
      </div>
    </div>
  );
}
