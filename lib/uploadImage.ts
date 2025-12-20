// lib/uploadImage.ts
import { supabase } from "@/lib/supabaseClient";
import { convertImageToWebP } from "./convertToWebP";

export async function uploadProductImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size exceeds 5MB");
  }

  const fileName = `${crypto.randomUUID()}.webp`;
  const filePath = `webp/${fileName}`;

  const webpFile = await convertImageToWebP(file);

  const { error } = await supabase.storage
    .from("product_images")
    .upload(filePath, webpFile, {
      contentType: "image/webp",
      cacheControl: "31536000", // 1 year
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("product_images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
