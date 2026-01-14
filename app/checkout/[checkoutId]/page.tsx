import { SafeImage } from "@/components/SafeImage";
import { formatIDR } from "@/lib/utils";
import { getAddressList } from "@/services/address.service";
import { getSessionData } from "@/services/order.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddressCard from "./AddressCard";
import ConfirmButton from "./ConfirmButton";

interface Props {
  params: { checkoutId: string };
}

// ... imports

export default async function CheckoutPage({ params }: Props) {
  const { checkoutId } = await params;
  const cookieStore = await cookies();

  const [sessionData, addressList] = await Promise.all([
    getSessionData({
      externalId: checkoutId,
      cookieHeader: cookieStore.toString(),
    }),
    getAddressList({ cookieHeader: cookieStore.toString() }),
  ]);

  const subtotal = sessionData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.11);
  const totalAmount = subtotal + tax + sessionData.shippingFee;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32 pt-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Konfirmasi Pesanan
          </h1>
          <p className="text-gray-500 font-medium">
            Selesaikan pembayaran untuk memproses pesanan Anda.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AddressCard
              status={sessionData.status}
              addressList={addressList}
              selectedAddress={addressList.find(
                (a) => a.id === sessionData.addressId
              )}
              totalAddress={addressList.length}
            />

            <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Daftar Belanja
              </h2>
              <div className="divide-y divide-gray-100">
                {sessionData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100">
                      <SafeImage
                        src={item.imageUrl || "/placeholder.png"}
                        alt={item.variantName}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-bold text-gray-900">
                        {item.variantName}
                      </h3>
                      <p className="text-sm font-medium text-gray-400">
                        {item.quantity} {item.quantityType}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      {formatIDR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {/* Sidebar Summary */}
          <aside className="relative">
            <div className="sticky top-8 lg:w-[380px]">
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-50">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Ringkasan Pesanan
                  </h2>
                </div>

                {/* Breakdown */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-700">
                      {formatIDR(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Pajak (11%)</span>
                    <span className="font-medium text-slate-700">
                      {formatIDR(tax)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm pb-2">
                    <span className="text-slate-500">Ongkos Kirim</span>
                    <span className="font-medium text-slate-700">
                      {formatIDR(sessionData.shippingFee)}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-dashed bg-slate-200 w-full border-t border-dashed" />

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="block text-sm font-medium text-slate-900">
                        Total Tagihan
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        Sudah termasuk PPN
                      </span>
                    </div>
                    <span className="text-xl font-bold text-blue-600 tracking-tight">
                      {formatIDR(totalAmount)}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    {sessionData.status !== "EXPIRED" ? (
                      <ConfirmButton externalId={checkoutId} />
                    ) : (
                      <div className="w-full py-3 px-4 bg-red-50 border border-red-100 rounded-xl text-center">
                        <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                          Sesi Berakhir
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Optional: Security Badge */}
              <p className="mt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Pembayaran Aman & Terenkripsi
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
