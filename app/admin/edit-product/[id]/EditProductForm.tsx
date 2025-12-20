"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
// import { updateProduct } from "../../../actions/productActions";

type ProductFormData = {
  productId: string;
  name: string;
  description: string | null;
  variants: Partial<VariantInputType>[];
};

export default function EditProductPage({ product }: { product: ProductType }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<ProductFormData>({
    defaultValues: {
      productId: product.id,
      name: product.name,
      description: product.description,
      variants: product.variants,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = () => {
    formRef.current?.requestSubmit();
    alert("✅ Product updated!");
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">✏️ Edit Product</h1>

      <form ref={formRef} action={() => {}} className="space-y-6">
        <input type="hidden" {...register("productId")} />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            {...register("name")}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">
            Product Variants
          </label>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-100 p-4 rounded-lg space-y-3"
            >
              <input
                type="hidden"
                {...register(`variants.${index}.id` as const)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Variant Name</label>
                  <input
                    {...register(`variants.${index}.name` as const)}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm">Quantity Type</label>
                  <select
                    {...register(`variants.${index}.quantityType` as const)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="unit">Unit</option>
                    <option value="kg">Kilogram</option>
                    <option value="liter">Liter</option>
                    <option value="sack">Sack</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`variants.${index}.price` as const)}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm">Stock</label>
                  <input
                    type="number"
                    {...register(`variants.${index}.stock` as const)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
              <button
                type="button"
                className="text-red-600 text-sm"
                onClick={() => remove(index)}
              >
                ❌ Remove Variant
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ name: "", quantityType: "unit", price: 0, stock: 0 })
            }
            className="text-blue-600 text-sm hover:underline"
          >
            ➕ Add Another Variant
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}
