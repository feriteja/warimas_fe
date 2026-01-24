"use server";

import { createCheckoutSession } from "@/services/order.service";
import { addPackage } from "@/services/package.service";
import { OrderItem } from "@/types";
import { InputAddPackages } from "@/types/package";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveOrderAsPackage(name: string, items: OrderItem[]) {
  const cookieStore = await cookies();

  const packageItems = items.map((item) => ({
    variantId: item.variant.id,
    quantity: item.quantity,
  }));

  const input: InputAddPackages = {
    name,
    items: packageItems,
    type: "personal",
  };

  try {
    await addPackage(input, cookieStore.toString());
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menyimpan paket" };
  }
}

export async function reorder(items: OrderItem[]) {
  const cookieStore = await cookies();

  const checkoutItems = items.map((item) => ({
    variantId: item.variant.id,
    quantity: item.quantity,
  }));

  try {
    const session = await createCheckoutSession(
      { items: checkoutItems },
      cookieStore.toString(),
    );

    if (session?.externalId) {
      redirect(`/checkout/${session.externalId}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return { success: false, error: "Gagal membuat pesanan baru" };
  }
}
