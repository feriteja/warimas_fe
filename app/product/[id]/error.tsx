"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h2 className="text-xl font-semibold mb-2">Terjadi kesalahan</h2>
      <p className="text-sm text-gray-600 mb-6">
        Gagal memuat detail produk. Silakan coba lagi.
      </p>

      <button
        onClick={() => router.replace("/")}
        className="rounded-xl bg-black px-6 py-3 text-white text-sm"
      >
        Kembali ke beranda
      </button>
    </div>
  );
}
