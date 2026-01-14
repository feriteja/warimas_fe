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
