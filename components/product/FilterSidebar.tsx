import { ProductFilterInput } from "@/types";
import { Check, Search, X } from "lucide-react";

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
              value={filters.search || ""}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
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
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPrice:
                    e.target.value === "" ? undefined : Number(e.target.value),
                })
              }
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Maks"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice:
                    e.target.value === "" ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Filter: Category (Mock) */}
        <div className="mb-8">
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
                    filters.categoryId === cat
                      ? "bg-indigo-600 border-indigo-600"
                      : "border-gray-300 bg-white group-hover:border-indigo-400"
                  }`}
                >
                  {filters.categoryId === cat && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={filters.categoryId === cat}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      categoryId: filters.categoryId === cat ? undefined : cat,
                    })
                  }
                />
                <span
                  className={`text-sm ${
                    filters.categoryId === cat
                      ? "text-indigo-600 font-medium"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter: Stock */}
        <div className="mb-8">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-semibold text-gray-900">
              Hanya Tersedia
            </span>
            <div
              className={`w-11 h-6 rounded-full relative transition-colors ${
                filters.inStock ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={filters.inStock || false}
                onChange={(e) =>
                  setFilters({ ...filters, inStock: e.target.checked })
                }
              />
              <div
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  filters.inStock ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
