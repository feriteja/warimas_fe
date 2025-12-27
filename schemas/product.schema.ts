import { z } from "zod";
import { variantSchema } from "./variant.schema";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string().min(1),
  variants: z.array(variantSchema).min(1),
});

export type ProductForm = z.infer<typeof productSchema>;
