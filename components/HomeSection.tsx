import { ProductsHome } from "@/types";
import ProductCard from "./ProductCard";

type CategorySectionProps = {
  category: ProductsHome;
};

export default function HomeSection({ category }: CategorySectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">{category.CategoryName}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {category.Products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
