import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  CONFIRM_CHECKOUT_SESSION,
  CREATE_SESSION_CHECKOUT,
  UPDATE_SESSION_ADDRESS,
  UPDATE_SESSION_PAYMENT_METHOD,
} from "@/lib/graphql/mutations";
import {
  GET_CHECKOUT_SESSION_DATA,
  GET_ORDER_DETAIL,
  GET_ORDER_LIST,
  GET_PAYAMENT_ORDER_INFO,
  UPDATE_ORDER_STATUS,
} from "@/lib/graphql/queries";
import {
  CheckoutSessionResponse,
  CheckoutSessionType,
  ConfirmCheckoutSessionResponse,
  CreateCheckoutSessionInput,
  Order,
  OrderFilterInput,
  OrderList,
  OrderPaginationInput,
  OrderSortInput,
  OrderStatus,
  PaymentMethod,
  PaymentOrderInfoResponse,
} from "@/types";

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
  cookieHeader?: string,
): Promise<CheckoutSessionResponse> {
  const res = await graphqlFetch<
    { createCheckoutSession: CheckoutSessionResponse },
    { input: CreateCheckoutSessionInput }
  >(CREATE_SESSION_CHECKOUT, {
    variables: { input },
    cache: "no-store",
    cookieHeader,
    isStrict: true,
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
    },
  ).then((res) => res.checkoutSession);
}

export async function updateAddressCheckoutSessionData(input: {
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

export async function updatePaymentMethodeCheckoutSessionData(
  input: {
    externalId: string;
    paymentMethod: PaymentMethod;
  },
  cookies?: string,
): Promise<{ success: boolean }> {
  return graphqlFetch<
    { updateSessionPaymentMethod: { success: boolean } },
    { input: { externalId: string; paymentMethod: string } }
  >(UPDATE_SESSION_PAYMENT_METHOD, {
    cache: "no-store",
    variables: { input },
    cookieHeader: cookies,
  }).then((res) => res.updateSessionPaymentMethod);
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
    isStrict: true,
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
    },
  ).then((res) => res.paymentOrderInfo);
}

export async function getOrderList({
  filter,
  sort,
  pagination,
  cookieHeader,
}: {
  cookieHeader?: string;
  filter?: OrderFilterInput;
  sort?: OrderSortInput;
  pagination?: OrderPaginationInput;
}) {
  return graphqlFetch<
    { orderList: OrderList },
    {
      filter?: OrderFilterInput;
      sort?: OrderSortInput;
      pagination?: OrderPaginationInput;
    }
  >(GET_ORDER_LIST, {
    cache: "no-store",
    variables: { filter, sort, pagination },
    cookieHeader: cookieHeader,
  }).then((res) => res.orderList);
}

export async function getOrderDetail({
  externalId,
  cookieHeader,
}: {
  externalId: string;
  cookieHeader?: string;
}): Promise<Order> {
  return graphqlFetch<{ orderDetailByExternalId: Order }>(GET_ORDER_DETAIL, {
    cache: "no-store",
    variables: { externalId },
    cookieHeader: cookieHeader,
  }).then((res) => res.orderDetailByExternalId);
}

export async function updateOrderStatus({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}): Promise<Order> {
  return graphqlFetch<
    { orderDetailByExternalId: Order },
    {
      orderId: number;
      status: OrderStatus;
    }
  >(UPDATE_ORDER_STATUS, {
    cache: "force-cache",
    variables: { orderId, status },
  }).then((res) => res.orderDetailByExternalId);
}
