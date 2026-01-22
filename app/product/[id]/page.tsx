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
      id,
      cookieHeader: cookieStore.toString(),
    });

    if (!productDetail) {
      notFound();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productDetail.name,
      image: productDetail.imageUrl ? [productDetail.imageUrl] : [],
      description: productDetail.description,
      sku: productDetail.id,
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        price: productDetail.variants[0]?.price || 0,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: productDetail.sellerName,
        },
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProductDetailClient product={productDetail} />
      </>
    );
  } catch (error: any) {
    if (error?.status === 404) {
      notFound();
    }

    throw error; // triggers app/product/[id]/error.tsx
  }
}
