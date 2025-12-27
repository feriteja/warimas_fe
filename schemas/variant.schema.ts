import { z } from "zod";
import { quantityTypes } from "@/types/quantity";

export const variantSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  quantityType: z.enum(quantityTypes),
  stock: z.number().int().nonnegative(),
});
