import CategoriesSection from "@/components/CategoriesSection";
import HomeProduct from "@/components/HomeProduct";
import PackageRecomandation from "@/components/PackageRecomandation";

export default function HomePage() {
  return (
    <div className=" md:py-4 bg-gradient-to-b from-gray-50 to-gray-100 ">
      <CategoriesSection />
      <div className="max-w-7xl mx-auto">
        <PackageRecomandation />
        <HomeProduct />
      </div>
    </div>
  );
}
