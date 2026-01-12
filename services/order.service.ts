import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  CONFIRM_CHECKOUT_SESSION,
  CREATE_SESSION_CHECKOUT,
  UPDATE_SESSION_ADDRESS,
} from "@/lib/graphql/mutations";
import {
  GET_CHECKOUT_SESSION_DATA,
  GET_PAYAMENT_ORDER_INFO,
} from "@/lib/graphql/queries";
import {
  CheckoutSessionResponse,
  CheckoutSessionType,
  ConfirmCheckoutSessionResponse,
  CreateCheckoutSessionInput,
  PaymentOrderInfoResponse,
} from "@/types";

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<CheckoutSessionResponse> {
  const res = await graphqlFetch<
    { createCheckoutSession: CheckoutSessionResponse },
    { input: CreateCheckoutSessionInput }
  >(CREATE_SESSION_CHECKOUT, {
    variables: { input },
    cache: "no-store",
  });

  return res.createCheckoutSession;
}

export async function getSessionData({
  externalId,
  cookieHeader,
}: {
  externalId: string;
  cookieHeader?: string;
}): Promise<CheckoutSessionType> {
  return graphqlFetch<{ checkoutSession: CheckoutSessionType }>(
    GET_CHECKOUT_SESSION_DATA,
    {
      cache: "no-store",
      variables: { externalId },
      cookieHeader: cookieHeader,
    }
  ).then((res) => res.checkoutSession);
}

export async function updateCheckoutSessionData(input: {
  externalId: string;
  addressId: string;
}): Promise<{ success: boolean }> {
  return graphqlFetch<
    { updateSessionAddress: { success: boolean } },
    { input: { externalId: string; addressId: string } }
  >(UPDATE_SESSION_ADDRESS, {
    cache: "no-store",
    variables: { input },
  }).then((res) => res.updateSessionAddress);
}

export async function confirmCheckoutSession({
  externalId,
}: {
  externalId: string;
}): Promise<ConfirmCheckoutSessionResponse> {
  return graphqlFetch<{
    confirmCheckoutSession: ConfirmCheckoutSessionResponse;
  }>(CONFIRM_CHECKOUT_SESSION, {
    cache: "no-store",
    variables: { input: { externalId } },
  }).then((res) => res.confirmCheckoutSession);
}

export async function getPaymentOrderInfo({
  externalId,
  cookieHeader,
}: {
  externalId: string;
  cookieHeader?: string;
}): Promise<PaymentOrderInfoResponse> {
  return graphqlFetch<{ paymentOrderInfo: PaymentOrderInfoResponse }>(
    GET_PAYAMENT_ORDER_INFO,
    {
      cache: "force-cache",
      variables: { externalId },
      cookieHeader: cookieHeader,
    }
  ).then((res) => res.paymentOrderInfo);
}
