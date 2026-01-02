"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RetrySection() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Ikon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        !
      </div>

      {/* Judul */}
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Produk gagal dimuat
      </h2>

      {/* Deskripsi */}
      <p className="mb-6 max-w-sm text-sm text-gray-500">
        Kami tidak dapat mengambil data produk saat ini. Silakan coba lagi dalam
        beberapa saat.
      </p>

      {/* Tombol Aksi */}
      <button
        onClick={handleRetry}
        disabled={isPending}
        className="
          inline-flex items-center justify-center gap-2
          rounded-md bg-gray-900 px-6 py-2.5
          text-sm font-medium text-white
          transition
          hover:bg-gray-800
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Memuat ulang…
          </>
        ) : (
          "Coba lagi"
        )}
      </button>

      {/* Catatan */}
      <p className="mt-4 text-xs text-gray-400">
        Jika masih gagal, kemungkinan server sedang tidak tersedia.
      </p>
    </div>
  );
}
