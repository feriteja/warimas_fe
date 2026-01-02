export function MobileCheckout({ total }: { total: number }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-xl font-bold text-green-600">
          Rp {total.toLocaleString("id-ID")}
        </p>
      </div>
      <button
        disabled={total === 0}
        className="px-6 py-3 rounded-lg text-white font-semibold bg-green-600 disabled:bg-gray-300"
      >
        Checkout
      </button>
    </div>
  );
}
