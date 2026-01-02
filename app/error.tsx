"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
