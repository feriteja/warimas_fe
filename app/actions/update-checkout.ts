// app/actions/update-checkout.ts
"use server";

import { updateCheckoutSessionData } from "@/services/order.service";
import { revalidatePath } from "next/cache";

export async function updateCheckoutAddressSA(
  checkoutId: string,
  addressId: string
) {
  await updateCheckoutSessionData({ externalId: checkoutId, addressId });

  revalidatePath(`/checkout/${checkoutId}`);
}
