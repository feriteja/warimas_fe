declare type QuantityType = "kg" | "liter" | "sack" | "unit";

declare type VariantInputType = {
  id?: string;
  productId?: string;
  name: string;
  quantityType: QuantityType;
  stock: number;
  price: number;
};

declare interface ProductType {
  id: string;
  name: string;
  description: string | null; // <- fix here
  variants: VariantInputType[];
}
