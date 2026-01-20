// d:\project\warimas\warimas_fe\app\checkout\[checkoutId]\actions.ts

"use server";

import { updatePaymentMethodeCheckoutSessionData } from "@/services/order.service";
import { PaymentMethod } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updatePaymentMethod(
  externalId: string,
  paymentMethod: PaymentMethod,
) {
  const cookieStore = await cookies();
  await updatePaymentMethodeCheckoutSessionData(
    {
      externalId,
      paymentMethod,
    },
    cookieStore.toString(),
  );
  revalidatePath(`/checkout/${externalId}`);
}
