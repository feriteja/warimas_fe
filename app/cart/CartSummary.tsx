import { Loader2, ShieldCheck } from "lucide-react";
import { formatIDR } from "@/lib/utils";

type Props = {
  totalPrice: number;
  totalItems: number;
  selectedCount: number;
  isLoading: boolean;
  onCheckout: () => void;
};

export function CartSummary({
  totalPrice,
  totalItems,
  selectedCount,
  isLoading,
  onCheckout,
}: Props) {
  return (
    <div className="hidden lg:block lg:col-span-4">
      <div className="sticky top-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Ringkasan Belanja
          </h2>

          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Total Barang ({totalItems})</span>
              <span className="font-medium text-slate-900">
                {formatIDR(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Total Diskon Barang</span>
              <span className="font-medium text-green-600">-Rp 0</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-base font-bold text-slate-800">
              Total Harga
            </span>
            <span className="text-xl font-bold text-green-600">
              {formatIDR(totalPrice)}
            </span>
          </div>

          <button
            disabled={selectedCount === 0 || isLoading}
            onClick={onCheckout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              `Beli (${selectedCount})`
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-green-50 bg-green-50/50 p-4 text-xs font-medium text-green-700">
          <ShieldCheck size={18} />
          <span>Transaksi aman & terpercaya</span>
        </div>
      </div>
    </div>
  );
}
