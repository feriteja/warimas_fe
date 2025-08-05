// app/admin/edit-product/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: { variants: true },
  });

  if (!product) return <div>❌ Product not found</div>;

  return <EditProductForm product={product} />;
}
