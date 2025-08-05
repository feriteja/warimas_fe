"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRef } from "react";
import { addProduct } from "../action";

type ProductFormInput = Omit<ProductType, "id">;

export default function AddProductPage() {
  const { register, control, handleSubmit, reset } = useForm<ProductFormInput>({
    defaultValues: {
      name: "",
      description: "",
      variants: [{ name: "", quantityType: "unit", price: 0, stock: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
    const variantsInput = document.getElementById(
      "variants-input"
    ) as HTMLInputElement;
    if (variantsInput) {
      variantsInput.value = JSON.stringify(data.variants);
    }

    formRef.current?.requestSubmit();
    reset();
    alert("✅ Product added successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🛠 Add New Product
      </h1>

      <form ref={formRef} action={addProduct} className="space-y-6">
        {/* Main inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            {...register("name")}
            name="name"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            name="description"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Variant builder */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-800">
            Product Variants
          </label>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-100 p-4 rounded-lg space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Variant Name</label>
                  <input
                    {...register(`variants.${index}.name`)}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm">Quantity Type</label>
                  <select
                    {...register(`variants.${index}.quantityType`)}
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
                    {...register(`variants.${index}.price`)}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm">Stock</label>
                  <input
                    type="number"
                    {...register(`variants.${index}.stock`)}
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

        {/* Hidden input for serialized variants */}
        <input type="hidden" id="variants-input" name="variants" />

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          💾 Save Product
        </button>
      </form>
    </div>
  );
}
