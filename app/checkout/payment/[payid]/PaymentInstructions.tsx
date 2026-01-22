export function PaymentInstructions({
  instructions,
}: {
  instructions?: string[];
}) {
  if (!instructions || instructions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-bold text-slate-900">Petunjuk Pembayaran</h3>
      <div className="space-y-4">
        {instructions.map((step, i) => (
          <div key={i} className="flex gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
              {i + 1}
            </span>
            <p
              className="text-sm leading-relaxed text-slate-600"
              dangerouslySetInnerHTML={{ __html: step }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
