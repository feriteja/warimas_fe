export type AddressType = {
  id: string;
  name: string;
  receiverName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type createAddressInput = {
  address: Omit<CreateAddressPayload, "setAsDefault">;
  setAsDefault?: boolean;
};

export type CreateAddressPayload = {
  name: string;
  receiverName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  setAsDefault: boolean;
};
