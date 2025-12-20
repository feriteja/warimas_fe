import React from "react";

import { Card, CardContent } from "@/components/ui/card";

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

type Props = {
  params: Promise<{ categoryName: string }>;
};

async function page({ params }: Props) {
  const { categoryName } = await params;

  return (
    <div className="max-w-7xl mx-auto my-10 md:my-20">
      <h2 className="text-3xl ml-2 font-bold border-l-4 border-black pl-4">
        {categoryName}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {dummyProducts("cat").map((p) => (
          <div key={p.id}>
            <Card className="rounded-2xl shadow-lg bg-white/40 backdrop-blur-xl border border-white/30 hover:shadow-2xl transition duration-300">
              <CardContent className="p-3 space-y-4">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-28 object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <h3 className="text-sm font-semibold leading-tight">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-700 font-medium">
                  Rp {p.price}.000
                </p>
                <button className="w-full py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
