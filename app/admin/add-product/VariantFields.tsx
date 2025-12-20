import { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductForm, quantityTypes } from "./schema";
import { showErrorToast } from "@/lib/toast";

interface Props {
  fields: { id: string }[];
  register: UseFormRegister<ProductForm>;
  errors: FieldErrors<ProductForm>;
  remove: (index: number) => void;
}

export function VariantFields({ fields, register, errors, remove }: Props) {
  const [previews, setPreviews] = useState<Record<string, string>>({});

  // cleanup all object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previews).forEach(URL.revokeObjectURL);
    };
  }, [previews]);

  const handleImageChange =
    (fieldId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showErrorToast("Error", "Ukuran gambar max 5MB");
        return;
      }

      const objectUrl = URL.createObjectURL(file);

      setPreviews((prev) => {
        if (prev[fieldId]) URL.revokeObjectURL(prev[fieldId]);
        return { ...prev, [fieldId]: objectUrl };
      });
    };

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                {...register(`variants.${index}.name`)}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Variant name"
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium mb-1">Harga</label>
              <input
                type="number"
                step="0.01"
                {...register(`variants.${index}.price`, {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="0.00"
              />
            </div>

            {/* Quantity Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Jenis Kuantitas
              </label>
              <select
                {...register(`variants.${index}.quantityType`)}
                className="w-full rounded-lg border px-4 py-2 bg-white"
              >
                {quantityTypes.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-1">Stok</label>
              <input
                type="number"
                {...register(`variants.${index}.stock`, {
                  valueAsNumber: true,
                })}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Stock quantity"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Gambar Produk
              </label>
              <input
                type="file"
                accept="image/*"
                {...register(`variants.${index}.image`, {
                  onChange: handleImageChange(field.id),
                })}
                className="w-full rounded-lg border px-4 py-2 bg-white"
              />

              {errors.variants?.[index]?.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.variants[index]?.image?.message as string}
                </p>
              )}

              {previews[field.id] && (
                <img
                  src={previews[field.id]}
                  alt="Preview produk"
                  className="mt-4 w-40 h-40 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          {/* Remove */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-600 hover:underline"
            >
              Hapus Varian
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
