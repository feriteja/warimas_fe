import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  CONFIRM_CHECKOUT_SESSION,
  CREATE_SESSION_CHECKOUT,
  UPDATE_SESSION_ADDRESS,
} from "@/lib/graphql/mutations";
import { GET_CHECKOUT_SESSION_DATA } from "@/lib/graphql/queries";
import {
  CheckoutSessionResponse,
  CheckoutSessionType,
  ConfirmCheckoutSessionResponse,
  CreateCheckoutSessionInput,
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
      cache: "force-cache",
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
  addressId,
}: {
  externalId: string;
  addressId?: string;
}): Promise<ConfirmCheckoutSessionResponse> {
  return graphqlFetch<{ confirmSession: ConfirmCheckoutSessionResponse }>(
    CONFIRM_CHECKOUT_SESSION,
    {
      cache: "no-store",
      variables: { externalId, addressId },
    }
  ).then((res) => res.confirmSession);
}
