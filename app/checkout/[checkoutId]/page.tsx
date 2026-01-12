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
          <div className="relative">
            <div className="sticky top-8 space-y-6">
              <section className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Ringkasan
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span>{formatIDR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Pajak (11%)</span>
                    <span>{formatIDR(tax)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium pb-4 border-b">
                    <span>Ongkos Kirim</span>
                    <span>{formatIDR(sessionData.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black text-blue-600">
                      {formatIDR(totalAmount)}
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <ConfirmButton externalId={checkoutId} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
