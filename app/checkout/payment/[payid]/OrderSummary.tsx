import { PaymentOrderInfoResponse } from "@/types";

export function OrderSummary({ data }: { data: PaymentOrderInfoResponse }) {
  return (
    <div className="space-y-6">
      {/* Amount & Expiry Card */}
      <div className="rounded-2xl bg-indigo-900 p-8 text-white shadow-xl shadow-indigo-200">
        <p className="text-indigo-200 text-sm font-medium">
          Total yang harus dibayar
        </p>
        <h1 className="mt-1 text-4xl font-black tracking-tight">
          <span className="text-xl font-medium text-indigo-300 mr-1">
            {data.currency}
          </span>
          {data.totalAmount.toLocaleString()}
        </h1>

        <div className="mt-8 border-t border-indigo-800 pt-6">
          <div className="flex items-center justify-between text-sm text-indigo-200">
            <span>Berakhir pada</span>
            <span className="font-semibold text-white">
              {new Date(data.expiresAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Info Card */}
      {data.shippingAddress && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Dikirim ke
          </h3>
          <div className="text-sm text-slate-700">
            <p className="font-bold text-slate-900">
              {data.shippingAddress.receiverName}
            </p>
            <p className="mt-1">{data.shippingAddress.address1}</p>
            <p>
              {data.shippingAddress.city}, {data.shippingAddress.province}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
