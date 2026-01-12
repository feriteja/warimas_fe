import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPaymentOrderInfo } from "@/services/order.service";
import { StatusBadge } from "./StatusBadge"; // Separate file
import { CopyButton } from "@/components/CopyButton";
// import { CopyButton } from "./_components/CopyButton"; // Client component for UX

export const metadata: Metadata = { title: "Secure Payment | View Order" };

export default async function CheckoutPaymentPage({
  params,
}: {
  params: Promise<{ payid: string }>;
}) {
  const { payid } = await params;
  if (!payid) redirect("/");

  const cookieStore = await cookies();
  const data = await getPaymentOrderInfo({
    externalId: payid,
    cookieHeader: cookieStore.toString(),
  });

  const isPending = data.status === "PENDING";

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-8 antialiased">
      <div className="mx-auto max-w-[1000px] px-6">
        {/* Top Navigation / Breadcrumb */}
        <nav className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="hover:text-slate-800 cursor-pointer">Store</span>
            <span>/</span>
            <span className="font-medium text-slate-900">Payment</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            SECURE ENCRYPTED
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Payment Summary Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Detail Pembayaran
                    </h2>
                    <h3 className="text-gray-400 text-sm">{payid}</h3>
                  </div>
                  <StatusBadge status={data.status} />
                </div>
              </div>

              <div className="p-6">
                {data.payment ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <DetailItem
                        label="Metode Pembayaran"
                        value={data.payment.method}
                      />
                      <DetailItem label="Bank Name" value={data.payment.bank} />
                    </div>

                    {data.payment.paymentCode && (
                      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Kode Bayar
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-mono font-bold text-indigo-600">
                            {data.payment.paymentCode}
                          </span>
                          <CopyButton text={data.payment.paymentCode} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    No payment details available.
                  </p>
                )}
              </div>
            </div>

            {/* Instructions */}
            {data.payment?.instructions && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-slate-900">
                  Petunjuk Pembayaran
                </h3>
                <div className="space-y-4">
                  {data.payment.instructions.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-5 space-y-6">
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
                    {new Date(data.expiresAt).toLocaleDateString()}
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
                  {/* <p className="mt-3 font-medium text-slate-500 italic underline cursor-pointer hover:text-indigo-600 transition">
                    Track Shipping Details
                  </p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
