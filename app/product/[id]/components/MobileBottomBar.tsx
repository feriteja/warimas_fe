import { Plus } from "lucide-react";
import { toast } from "sonner";

interface MobileBottomBarProps {
  handleAddToCart: () => void;
  loading: boolean;
  isOutOfStock: boolean;
  handleCheckout: () => void;
}

export function MobileBottomBar({
  handleAddToCart,
  loading,
  isOutOfStock,
  handleCheckout,
}: MobileBottomBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 pb-safe z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={loading || isOutOfStock}
          className="flex-1 bg-slate-100 text-slate-900 py-3.5 rounded-full font-bold text-sm active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Keranjang
        </button>
        <button
          disabled={loading || isOutOfStock}
          onClick={() => handleCheckout()}
          className="flex-1 bg-slate-900 text-white py-3.5 rounded-full font-bold text-sm shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}
