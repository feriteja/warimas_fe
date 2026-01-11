type Props = {
  total: number;
  onCheckout: () => void;
};

export function CartSummary({ total, onCheckout }: Props) {
  return (
    <div className="hidden md:flex flex-col w-80 bg-white rounded-xl shadow-sm border p-4 sticky top-8 h-fit">
      <h3 className="text-lg font-semibold mb-3">Ringkasan Belanja</h3>
      <p className="text-gray-600 mb-2">Total</p>
      <p className="text-2xl font-bold text-green-600 mb-4">
        Rp {total.toLocaleString("id-ID")}
      </p>
      <button
        disabled={total === 0}
        onClick={onCheckout}
        className="w-full py-3 rounded-lg text-white font-semibold bg-green-600 disabled:bg-gray-300"
      >
        Checkout
      </button>
    </div>
  );
}
