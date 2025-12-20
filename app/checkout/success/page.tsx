"use client";
// --- SUCCESS PAGE ---
export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-sm text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Pesanan Berhasil!
        </h1>
        <p className="text-gray-600 mb-4">
          Terima kasih sudah berbelanja di Warimas.
        </p>
        <button
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold"
          onClick={() => (window.location.href = "/")}
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
