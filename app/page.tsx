import React, { Suspense } from "react";
import HeroBanner from "@/components/home/HeroBanner"; // New component for professional look
import ProductFeed from "@/components/home/ProductFeed";
import RecommendationSection, {
  RecommendationSkeleton,
} from "@/components/home/RecommendationSection";
import CategoriesSection from "@/components/home/CategoriesSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. Hero / Banner Section */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 -mt-8 relative z-10">
        {/* 2. Categories (Floating slightly over banner) */}
        <CategoriesSection />

        {/* 3. Recommendations (Personalized) */}
        <Suspense fallback={<RecommendationSkeleton />}>
          <RecommendationSection />
        </Suspense>

        {/* 4. Main Product Feed (Async with Error Boundary) */}
        <Suspense fallback={<ProductFeedSkeleton />}>
          <ProductFeed />
        </Suspense>
      </div>
    </main>
  );
}

// Simple Skeleton for loading state
function ProductFeedSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
