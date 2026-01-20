"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center max-w-lg w-full transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 transition-transform hover:rotate-6">
          <AlertTriangle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-4">
          Ups, Terjadi Kesalahan
        </h2>

        <p className="text-gray-500 mb-8 text-base leading-relaxed">
          Maaf, kami mengalami kendala saat memproses permintaan Anda. Silakan
          coba muat ulang halaman.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            Coba Lagi
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </Link>
        </div>

        {error.digest && (
          <div className="mt-8 pt-6 border-t border-gray-50">
            <p className="text-xs text-gray-400 font-mono">
              Error ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
