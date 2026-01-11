enum CheckoutSessionStatus {
  PENDING = "PENDING",
  COMPLETED = "PAID",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

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
  session?: CheckoutSessionType;
}
