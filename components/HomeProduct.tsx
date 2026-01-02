import { getProductHomeList } from "@/services/product.service";
import HomeSection from "./HomeSection";
import RetrySection from "./RetrySection";

export default async function CategoriesPage() {
  try {
    const data = await getProductHomeList();

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 space-y-20">
        {data.productsHome.map((category) => (
          <HomeSection key={category.CategoryName} category={category} />
        ))}
      </div>
    );
  } catch (error) {
    return <RetrySection />;
  }
}
