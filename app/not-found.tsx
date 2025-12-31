import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 px-6 text-center text-white">
      <div className="max-w-md">
        <p className="mb-2 text-sm uppercase tracking-widest text-neutral-400">
          404 Error
        </p>

        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mb-8 text-neutral-400">
          Maaf, Sepertinya halaman yang anda cari tidak ada atau sudah pindah
        </p>

        <Link
          href="/"
          replace
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
