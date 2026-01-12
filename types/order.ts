enum CheckoutSessionStatus {
  PENDING = "PENDING",
  COMPLETED = "PAID",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export type PaymentStatus =
  | "REQUIRES_ACTION"
  | "PAID"
  | "FAILED"
  | "EXPIRED"
  | string;

export interface CheckoutSessionResponse {
  externalId: string;
  status: CheckoutSessionStatus;
  expiresAt: string;
}

export interface CheckoutSessionType {
  id: string;
  externalId: string;
  status: CheckoutSessionStatus;
  expiresAt: string;
  createdAt: string;
  addressId?: string;
  items: CheckoutSessionItemType[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
}

export interface CheckoutSessionItemType {
  id: string;
  variantId: string;
  variantName: string;
  imageUrl?: string;
  quantity: number;
  quantityType: string;
  price: number;
  subtotal: number;
}

export interface CreateCheckoutSessionInput {
  items: {
    variantId: string;
    quantity: number;
  }[];
}

export interface ConfirmCheckoutSessionResponse {
  success: boolean;
  message?: string;
  order_external_id?: string;
}

export interface PaymentOrderInfoResponse {
  status: PaymentStatus;
  expiresAt: string; // Go's time.Time serializes to an ISO 8601 string
  totalAmount: number;
  currency: string;
  shippingAddress?: ShippingAddress; // Pointer indicates it could be null/undefined
  payment?: PaymentDetail;
}

export interface PaymentDetail {
  method: string;
  bank?: string;
  paymentCode?: string;
  referenceId: string;
  instructions: string[];
}

export interface ShippingAddress {
  name: string;
  receiverName: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
}
