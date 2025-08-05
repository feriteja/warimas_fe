"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { QuantityType, MovementType } from "@prisma/client";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const rawVariants = formData.get("variants") as string;

  if (!name || !rawVariants) {
    throw new Error("Invalid form data");
  }

  let variants: {
    name: string;
    quantityType: QuantityType;
    price: number;
    stock: number;
  }[];

  try {
    const parsed = JSON.parse(rawVariants);
    variants = parsed.map((v: any) => ({
      name: v.name,
      quantityType: v.quantityType as QuantityType,
      price: parseFloat(String(v.price)),
      stock: parseInt(String(v.stock)),
    }));
  } catch (e: unknown) {
    console.error("Failed to parse variants:", e);
    throw new Error("Invalid variant data");
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      categoryId,
      variants: {
        create: variants,
      },
    },
    include: { variants: true },
  });

  // Create stock movements for each variant
  for (const variant of product.variants) {
    await prisma.stockMovement.create({
      data: {
        variantId: variant.id,
        quantity: variant.stock,
        type: MovementType.purchase,
        note: "Initial stock on product creation",
      },
    });
  }

  revalidatePath("/");
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  });
}

export async function updateProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;

  const variants: {
    id?: string;
    name: string;
    quantityType: QuantityType;
    price: number;
    stock: number;
  }[] = [];

  const variantIndices = new Set<number>();
  for (const key of formData.keys()) {
    const match = key.match(/^variants\.(\d+)\./);
    if (match) variantIndices.add(Number(match[1]));
  }

  for (const index of variantIndices) {
    const id = formData.get(`variants.${index}.id`)?.toString();
    const name = formData.get(`variants.${index}.name`)?.toString() ?? "";
    const quantityType = formData.get(
      `variants.${index}.quantityType`
    ) as QuantityType;
    const price = parseFloat(
      formData.get(`variants.${index}.price`)?.toString() ?? "0"
    );
    const stock = parseInt(
      formData.get(`variants.${index}.stock`)?.toString() ?? "0",
      10
    );

    if (name) {
      variants.push({ ...(id && { id }), name, quantityType, price, stock });
    }
  }

  for (const variant of variants) {
    // Check if variant exists and compare stock
    if (variant.id) {
      const existing = await prisma.variant.findUnique({
        where: { id: variant.id },
      });
      if (existing && existing.stock !== variant.stock) {
        const diff = variant.stock - existing.stock;
        await prisma.stockMovement.create({
          data: {
            variantId: variant.id,
            quantity: diff,
            type: MovementType.adjustment,
            note: "Stock updated via admin",
          },
        });
      }
    }
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      categoryId,
      variants: {
        upsert: variants.map((variant) => ({
          where: { id: variant.id ?? "" },
          create: {
            name: variant.name,
            quantityType: variant.quantityType,
            price: variant.price,
            stock: variant.stock,
          },
          update: {
            name: variant.name,
            quantityType: variant.quantityType,
            price: variant.price,
            stock: variant.stock,
          },
        })),
      },
    },
  });

  revalidatePath("/");
}
