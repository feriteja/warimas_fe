"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { productSchema, ProductForm } from "./schema";
import { uploadProductImage } from "@/lib/uploadImage";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/lib/toast";
import { toast } from "sonner";
import { addProduct, addProductVariants } from "@/services/product.service";

export function useNewProductForm() {
  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [
        { name: "Original", price: 1000, quantityType: "unit", stock: 1 },
      ],
    },
  });

  const variants = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = async (data: ProductForm) => {
    const loading = showLoadingToast("Produk", "Mengupload produk...");

    try {
      /** 1️⃣ Upload main product image */
      const productImageUrl = await uploadProductImage(data.image[0]);

      /** 2️⃣ Create product */
      const product = await addProduct({
        name: data.name,
        imageUrl: productImageUrl,
        description: data.description,
        categoryId: data.categoryId,
        subcategoryId: data.subCategory,
      });

      /** 3️⃣ Upload variant images & build payload */
      const variantPayload = await Promise.all(
        data.variants.map(async (variant) => {
          const variantImageUrl =
            variant.image?.length > 0
              ? await uploadProductImage(variant.image[0])
              : undefined;

          return {
            productId: product.id,
            subcategoryId: data.subCategory,
            quantityType: variant.quantityType,
            name: variant.name,
            price: variant.price,
            stock: variant.stock,
            imageUrl: variantImageUrl,
          };
        }),
      );

      /** 4️⃣ Save variants */
      await addProductVariants(variantPayload);

      toast.dismiss(loading);
      showSuccessToast("Berhasil", "Produk berhasil dibuat");
      form.reset();
    } catch (error) {
      toast.dismiss(loading);
      showErrorToast("Gagal", "Gagal membuat produk");
      console.error(error);
    }
  };

  return { form, variants, onSubmit };
}
