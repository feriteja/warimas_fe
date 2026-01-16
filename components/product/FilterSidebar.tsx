import useDebouncedValue from "@/hooks/useDebouncedValue";
import { formatIDR } from "@/lib/utils";
import { ProductFilterInput } from "@/types";
import { Check, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_PRICE = 100000;

const FilterSidebar = ({
  filters,
  setFilters,
  isOpen,
  onClose,
}: {
  filters: ProductFilterInput;
  setFilters: (f: ProductFilterInput) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Mobile drawer overlay classes
  const mobileClasses = isOpen ? "fixed inset-0 z-50 flex" : "hidden lg:block";

  const [localFilters, setLocalFilters] = useState<ProductFilterInput>(filters);
  const debouncedFilters = useDebouncedValue(localFilters, 500);

  // Sync local filters with prop filters when they change externally
  useEffect(() => {
    // Only update if the filters prop is different from our current debounced state
    // This prevents overwriting local state while the user is typing and the debounce hasn't fired yet
    // but allows resetting or external updates to propagate.
    if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
      setLocalFilters(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Propagate changes to parent when debounced value changes
  useEffect(() => {
    setFilters(debouncedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters]);

  return (
    <div
      className={`${mobileClasses} lg:relative lg:z-0 lg:w-64 lg:flex-shrink-0`}
    >
      {/* Mobile Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Content */}
      <div className="relative flex flex-col w-full max-w-xs p-6 bg-white lg:bg-transparent h-full lg:h-auto lg:w-full overflow-y-auto lg:overflow-visible shadow-xl lg:shadow-none">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="text-lg font-bold text-gray-900">Filter</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter: Search */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-gray-900 mb-2 block">
            Cari
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              value={localFilters.search || ""}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, search: e.target.value })
              }
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Filter: Price Range */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-gray-900 mb-2 block">
            Rentang Harga
          </label>
          <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
            <span>{formatIDR(localFilters.minPrice || 0)}</span>
            <span>{formatIDR(localFilters.maxPrice || MAX_PRICE)}</span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-200">
            <div
              className="absolute h-full rounded-full bg-indigo-600"
              style={{
                left: `${((localFilters.minPrice || 0) / MAX_PRICE) * 100}%`,
                right: `${
                  100 - ((localFilters.maxPrice || MAX_PRICE) / MAX_PRICE) * 100
                }%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={1000}
              value={localFilters.minPrice || 0}
              onChange={(e) => {
                const value = Math.min(
                  Number(e.target.value),
                  (localFilters.maxPrice || MAX_PRICE) - 10000
                );
                setLocalFilters({
                  ...localFilters,
                  minPrice: value,
                });
              }}
              className="pointer-events-none absolute h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer"
            />
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={1000}
              value={localFilters.maxPrice || MAX_PRICE}
              onChange={(e) => {
                const value = Math.max(
                  Number(e.target.value),
                  (localFilters.minPrice || 0) + 10000
                );
                setLocalFilters({
                  ...localFilters,
                  maxPrice: value,
                });
              }}
              className="pointer-events-none absolute h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
        </div>

        {/* Filter: Category (Mock) */}
        {/* <div className="mb-8">
          <label className="text-sm font-semibold text-gray-900 mb-2 block">
            Kategori
          </label>
          <div className="space-y-2">
            {["Beverages", "Food", "Snacks", "Raw Materials"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    localFilters.categoryId === cat
                      ? "bg-indigo-600 border-indigo-600"
                      : "border-gray-300 bg-white group-hover:border-indigo-400"
                  }`}
                >
                  {localFilters.categoryId === cat && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={localFilters.categoryId === cat}
                  onChange={() =>
                    setLocalFilters({
                      ...localFilters,
                      categoryId:
                        localFilters.categoryId === cat ? undefined : cat,
                    })
                  }
                />
                <span
                  className={`text-sm ${
                    localFilters.categoryId === cat
                      ? "text-indigo-600 font-medium"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Filter: Stock */}
        {/* <div className="mb-8">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-semibold text-gray-900">
            Hanya Tersedia
          </span>
          <div
            className={`w-11 h-6 rounded-full relative transition-colors ${
              localFilters.inStock ? "bg-indigo-600" : "bg-gray-200"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={localFilters.inStock || false}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  inStock: e.target.checked,
                })
              }
            />
            <div
              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                localFilters.inStock ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div> */}
      </div>
    </div>
  );
};

export default FilterSidebar;
