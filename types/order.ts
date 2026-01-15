import { AddressType } from "./address";
import { User } from "./user";

enum CheckoutSessionStatus {
  PENDING = "PENDING",
  COMPLETED = "PAID",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export enum OrderStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PAID = "PAID",
  ACCEPTED = "ACCEPTED",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
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

export interface OrderFilterInput {
  search?: string;
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderSortInput {
  field?: "TOTAL" | "CREATED_AT";
  direction?: "ASC" | "DESC";
}

export interface OrderPaginationInput {
  page?: number;
  limit?: number;
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

// types.ts
export interface PageInfo {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

export interface OrderPricing {
  currency: string;
  subtotal: number;
  total: number;
  tax: number;
  discount: number;
  shippingFee: number;
}

export interface OrderItemPricing {
  price: number;
  subtotal: number;
}

export interface VariantOrder {
  id: string;
  name: string;
  productName: string;
  imageUrl: string | null;
}

export interface OrderItem {
  id: number;
  quantity: number;
  quantityType: string;
  pricing: OrderItemPricing;
  variant: VariantOrder;
}

export interface Shipping {
  address: AddressType;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  externalId: string;
  invoiceNumber: string | null;
  status: OrderStatus;
  user: User;
  pricing: OrderPricing;
  items: OrderItem[];
  shipping: Shipping;
  timestamps: Timestamps;
}

export interface OrderList {
  pageInfo: PageInfo;
  items: Order[];
}

export interface OrderListResponse {
  data: { orderList: OrderList };
}
