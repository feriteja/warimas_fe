import {
  FilterState,
  ProductFilterInput,
  ProductSortField,
  ProductSortInput,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function updateQuery(
  router: AppRouterInstance,
  params: ReadonlyURLSearchParams,
  next: Record<string, string | number | undefined>
) {
  const newParams = new URLSearchParams(params.toString());

  Object.entries(next).forEach(([key, value]) => {
    if (!value) newParams.delete(key);
    else newParams.set(key, String(value));
  });

  router.push(`?${newParams.toString()}`);
}

export const mapProductFiltersToAPI = (
  filters: FilterState
): ProductFilterInput => ({
  categoryId: filters.categoryId || undefined,
  search: filters.search || undefined,
  status: filters.status || undefined,
  sellerName: filters.sellerName || undefined,
  inStock: filters.inStock,
  minPrice: filters.minPrice?.toString(),
  maxPrice: filters.maxPrice?.toString(),
});

export const mapProductSortToAPI = (
  sortBy: "name" | "createdAt"
): ProductSortInput => ({
  field:
    sortBy === "name" ? ProductSortField.NAME : ProductSortField.CREATED_AT,
  direction: "DESC",
});

export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};
