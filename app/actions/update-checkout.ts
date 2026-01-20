// app/actions/update-checkout.ts
"use server";

import { updateAddressCheckoutSessionData } from "@/services/order.service";
import { revalidatePath } from "next/cache";

export async function updateCheckoutAddressSA(
  checkoutId: string,
  addressId: string,
) {
  await updateAddressCheckoutSessionData({ externalId: checkoutId, addressId });

  revalidatePath(`/checkout/${checkoutId}`);
}
