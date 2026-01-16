import { formatIDR } from "@/lib/utils";

type Props = {
  total: number;
  selectedItems: number;
  onCheckout: () => void;
};

export function MobileCheckout({ total, selectedItems, onCheckout }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-500">
            Total Harga
          </span>
          <span className="text-lg font-bold text-green-600">
            {formatIDR(total)}
          </span>
        </div>
        <button
          disabled={total === 0}
          onClick={() => onCheckout()}
          className="rounded-xl bg-green-600 px-8 py-3 text-sm font-bold text-white shadow-lg
           shadow-green-200 transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          Beli ({selectedItems})
        </button>
      </div>
    </div>
  );
}
