import { getProductHomeList } from "@/services/product.service";
import HomeSection from "./HomeSection";

export default async function CategoriesPage() {
  const data = await getProductHomeList({});

  return (
    <div className="p-6 space-y-20 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {data?.productsHome.map((category) => (
        <HomeSection key={category.CategoryName} category={category} />
      ))}
    </div>
  );
}
