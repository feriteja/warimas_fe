"use server";

import { prisma } from "@/lib/prisma";

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
    },
  });
}
