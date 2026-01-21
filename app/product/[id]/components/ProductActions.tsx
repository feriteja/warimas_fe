import { Minus, Plus, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";

interface ProductActionsProps {
  price: number;
  qty: number;
  setQty: (q: number | ((prev: number) => number)) => void;
  stock: number;
  isOutOfStock: boolean;
  loading: boolean;
  handleAddToCart: () => void;
  handleCheckout: () => void;
}

export function ProductActions({
  price,
  qty,
  setQty,
  stock,
  isOutOfStock,
  loading,
  handleAddToCart,
  handleCheckout,
}: ProductActionsProps) {
  return (
    <div className="hidden lg:block lg:col-span-3 relative">
      <div className="sticky top-24 p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white">
        <h3 className="font-bold text-slate-900 mb-4">Atur Jumlah</h3>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1 || isOutOfStock}
              className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-600 shadow-sm hover:text-slate-900 disabled:opacity-50 transition-all"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-bold text-slate-900">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(stock, q + 1))}
              disabled={qty >= stock || isOutOfStock}
              className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-600 shadow-sm hover:text-slate-900 disabled:opacity-50 transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-sm text-slate-500">
            Stok: <span className="font-medium text-slate-900">{stock}</span>
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-500 text-sm">Subtotal</span>
          <span className="text-lg font-bold text-slate-900">
            Rp {(price * qty).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="space-y-3">
          <button
            disabled={loading || isOutOfStock}
            onClick={handleAddToCart}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            {loading ? "..." : "Keranjang"}
          </button>
          <button
            disabled={loading || isOutOfStock}
            onClick={handleCheckout}
            className="w-full bg-white text-slate-900 border border-slate-200 py-3 rounded-xl font-bold text-sm hover:border-slate-900 hover:bg-slate-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Beli Langsung
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Garansi 100% Original</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Truck size={16} className="text-blue-600" />
            <span>Pengiriman Aman</span>
          </div>
        </div>
      </div>
    </div>
  );
}
