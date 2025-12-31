// app/product/[id]/page.tsx
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/services/product.service";
import ProductDetailClient from "./ProductDetail.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const { productDetail } = await getProductDetail({
      id: id,
      cookieHeader: cookieStore.toString(),
    });

    if (!productDetail) {
      notFound();
    }

    return <ProductDetailClient product={productDetail} />;
  } catch (error: any) {
    /**
     * Example handling:
     * - 404 from API → notFound()
     * - 401/403 → let error boundary handle
     * - 500 → error boundary
     */
    if (error?.status === 404) {
      notFound();
    }

    throw error; // triggers app/product/[id]/error.tsx
  }
}
