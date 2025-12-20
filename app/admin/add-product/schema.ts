import { z } from "zod";

export const quantityTypes = ["kg", "liter", "sack", "unit"] as const;

export const variantSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  quantityType: z.enum(quantityTypes),
  stock: z.number().int().nonnegative(),
  image: z.any().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.uuid(),
  subCategory: z.uuid(),
  image: z.any().refine((file) => file?.length === 1, "Image is required"),
  variants: z.array(variantSchema).min(1),
});

export type ProductForm = z.infer<typeof productSchema>;
