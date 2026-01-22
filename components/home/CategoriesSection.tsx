import React from "react";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { getCategory } from "@/services/category.service";
import { CategoryItem } from "@/types";

// This is now an async Server Component.
// It fetches its own data.
export default async function CategoriesSection() {
  let categories: CategoryItem[] = [];
  let totalCount = 0;

  try {
    // On the homepage, we'll show a preview of categories.
    // Let's fetch up to 12 to have a nice grid, but the user can see all on the category page.
    const data = await getCategory({ page: 1, limit: 12 });
    if (data) {
      categories = data.items;
      totalCount = data.pageInfo.totalItems;
    }
  } catch (error) {
    console.error("Failed to fetch categories for homepage:", error);
    // Don't render the section if fetching fails, to avoid breaking the page.
    return null;
  }

  // If there are no categories, don't render anything.
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 rounded-md text-emerald-600">
            <LayoutGrid size={18} />
          </div>
          <h2 className="font-bold text-gray-800 text-lg">Kategori</h2>
        </div>

        {/* Link to the full category page */}
        <Link
          href="/category"
          className="text-sm font-semibold text-emerald-600 hover:underline"
        >
          Lihat Semua ({totalCount})
        </Link>
      </div>

      {/* THE GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link href={`/search?cs=${cat.slug}`} key={cat.id}>
            <div
              className="
              flex items-center justify-center
              h-12 w-full
              px-2
              text-xs sm:text-sm font-medium text-gray-600
              bg-gray-50 border border-gray-100 rounded-lg
              hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200
              active:scale-95
              transition-all duration-200
              text-center leading-tight
              "
            >
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
