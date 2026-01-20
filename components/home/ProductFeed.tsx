import { getProductHomeList } from "@/services/product.service";
import ProductCard from "./ProductCard";
import RetrySection from "../RetrySection";
import Link from "next/link";

export default async function ProductFeed() {
  try {
    const data = await getProductHomeList();
    console.log("🚀 ~ ProductFeed ~ data:", data);

    if (!data || !data.productsHome || data.productsHome.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">Belum ada produk.</div>
      );
    }

    return (
      <div className="space-y-12">
        {data.productsHome.map((category) => (
          <section key={category.categoryName} className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <h2 className="text-xl font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">
                {category.categoryName}
              </h2>
              <Link
                href={`/search?cs=${category.categorySlug}`}
                className="text-sm text-emerald-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Home Feed Error:", error);
    // Graceful error handling UI
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
        <h3 className="text-red-800 font-medium">Gagal memuat produk</h3>
        <p className="text-red-600 text-sm mb-4">
          Terjadi kesalahan saat mengambil data.
        </p>
        <RetrySection />
      </div>
    );
  }
}
