"use client";

import { Combobox } from "@/components/Combobox";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/lib/toast";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  addCategory,
  addSubCategory,
  getCategory,
  getSubCategory,
} from "@/services/category.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useNewProductForm } from "./useNewProductForm";
import { VariantFields } from "./VariantFields";
import { CategoryItem, Subcategory } from "@/types";

export function NewProductForm() {
  const {
    form: {
      setValue,
      register,
      handleSubmit,
      formState: { errors },
    },
    variants,
    onSubmit,
  } = useNewProductForm();

  const [preview, setPreview] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);

  const fetchCategories = useCallback(async (name?: string) => {
    try {
      const res = await getCategory({ name });
      setCategories(res.items);
    } catch {
      showErrorToast("Gagal", "Gagal mengambil kategori");
    }
  }, []);

  const fetchSubCategories = useCallback(
    async (categoryId: string, search?: string) => {
      try {
        const res = await getSubCategory({
          categoryId,
          name: search || "",
          limit: 100,
          page: 1,
        });
        setSubCategories(res.items);
      } catch {
        showErrorToast("Gagal", "Gagal mengambil sub kategori");
      }
    },
    [],
  );

  const onAddCategory = useCallback(
    async (name: string) => {
      const toastLoading = showLoadingToast(
        `Kategori: ${capitalizeFirstLetter(name)}`,
        "Sedang membuat kategori",
      );

      try {
        await addCategory(name);
        await fetchCategories();

        toast.dismiss(toastLoading);
        showSuccessToast("Berhasil", "Kategori berhasil dibuat");
      } catch {
        toast.dismiss(toastLoading);
        showErrorToast("Gagal", "Sepertinya ada gangguan");
      }
    },
    [fetchCategories],
  );

  const onAddSubCategory = useCallback(
    async (categoryId: string, name: string) => {
      const toastLoading = showLoadingToast(
        `Sub Kategori: ${capitalizeFirstLetter(name)}`,
        "Sedang membuat sub kategori",
      );

      try {
        await addSubCategory(categoryId, name);
        await fetchSubCategories(categoryId);

        toast.dismiss(toastLoading);
        showSuccessToast("Berhasil", "Sub kategori berhasil dibuat");
      } catch {
        toast.dismiss(toastLoading);
        showErrorToast("Gagal", "Sepertinya ada gangguan");
      }
    },
    [fetchSubCategories],
  );

  const handleCategoryChange = (val: CategoryItem | null) => {
    setSelectedCategory(val);
    setSubCategories([]);
    setValue("categoryId", val?.id ?? "");
    setValue("subCategory", "");

    if (val) {
      fetchSubCategories(val.id);
    }
  };

  // Fetch categories (mock or from server)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-8 shadow-xl rounded-2xl border border-gray-100"
    >
      {/* Product Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            {...register("name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Beras, Minyak"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambar Produk
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                  showErrorToast("Error", "Ukuran gambar max 5MB");
                  return;
                }

                const objectUrl = URL.createObjectURL(file);
                setPreview((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return objectUrl;
                });
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message as string}
            </p>
          )}

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview produk"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            {...register("description")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Kejutan dari petani padi"
            rows={3}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategori
          </label>
          <Combobox<CategoryItem>
            options={categories}
            getLabel={(c) => c.name}
            getValue={(c) => c.id}
            label="Pilih Kategori"
            onActionEmpty={(val) => onAddCategory(val)}
            onChange={handleCategoryChange}
          />

          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {selectedCategory && (
          <div>
            <label
              htmlFor="sub category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sub Kategori
            </label>
            <Combobox<Subcategory>
              options={subCategories}
              getLabel={(c) => c.name}
              getValue={(c) => c.id}
              label="Pilih Sub Kategori"
              onActionEmpty={(val) =>
                onAddSubCategory(selectedCategory?.id, val)
              }
              onChange={(val) => {
                setValue("subCategory", val?.id || "");
              }}
            />

            {errors.subCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subCategory.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Variants */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Varian</h2>

        <VariantFields
          fields={variants.fields}
          register={register}
          remove={variants.remove}
          errors={errors}
        />

        <button
          type="button"
          onClick={() =>
            variants.append({
              name: "",
              price: 0,
              quantityType: "unit",
              stock: 0,
              image: null,
            })
          }
          className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          + Tambah Varian
        </button>
      </div>

      <div className="pt-6 border-t border-gray-200 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Masukan Produk
        </button>
      </div>
    </form>
  );
}
