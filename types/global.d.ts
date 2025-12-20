const quantityTypes = ["kg", "liter", "sack", "unit"] as const;

declare type QuantityType = (typeof quantityTypes)[number];

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
  description?: string; // Updated to match schema (optional, not null)
  categoryId?: string; // Optional if needed for consistency
  variants: VariantInputType[];
}

const variantSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  quantityType: z.enum(quantityTypes),
  stock: z.number().int().nonnegative(),
});

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(), // Matches ProductType now
  categoryId: z.string().min(1),
  variants: z.array(variantSchema).min(1),
});

declare type ProductForm = z.infer<typeof productSchema>;

declare type CategoryType = {
  id: string;
  name: string;
};

declare type SubCategoryType = {
  id: string;
  categoryID: string;
  name: string;
};

declare type CreateProductInput = {
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  description?: string;
  categoryId: string;
};

declare type CreateProductVariantInput = {
  productId: string;
  subcategoryID: string;
  quantityType: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  description?: string;
};
