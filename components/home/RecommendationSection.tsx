import React from "react";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { getPackages } from "@/services/package.service";
import { cookies } from "next/headers";
import Link from "next/link";
import PackageRow from "./PackageRow";

export default async function RecommendationSection() {
  const cookieStore = await cookies();
  const [personalData, promotionData] = await Promise.all([
    getPackages(
      { filter: { type: "personal" }, limit: 3 },
      cookieStore.toString(),
    ),
    getPackages({ filter: { type: "promotion" }, limit: 5 }),
  ]);

  const personalPackages = personalData?.items || [];
  const promotionPackages = promotionData?.items || [];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Box 1: Buy Again (High Priority) or Encouragement */}
      {personalPackages.length > 0 ? (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={20} className="text-blue-600" />
            <h2 className="font-bold text-lg text-gray-900">Beli Lagi</h2>
          </div>

          <div className="space-y-3">
            {personalPackages.map((item: any) => (
              <PackageRow key={item.id} item={item} actionLabel="Beli Lagi" />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center min-h-[240px]">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <ShoppingBag size={28} className="text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            Mulai Belanja
          </h3>
          <p className="text-gray-500 text-sm mb-5 max-w-[280px]">
            Belum ada riwayat belanja. Yuk penuhi kebutuhan dapurmu sekarang!
          </p>
          <Link
            href="/category"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            Lihat Produk <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Box 2: Recommendations */}
      {promotionPackages.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-orange-500" />
            <h2 className="font-bold text-lg text-gray-900">Rekomendasi</h2>
          </div>

          <div className="space-y-3">
            {promotionPackages.map((item: any) => (
              <PackageRow
                key={item.id}
                item={item}
                actionLabel="Cek"
                isSecondary
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function RecommendationSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-[260px] animate-pulse flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
          </div>
          <div className="space-y-4 flex-1">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-8 w-16 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
