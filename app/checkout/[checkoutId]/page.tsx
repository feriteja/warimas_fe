import { SafeImage } from "@/components/SafeImage";
import { formatIDR } from "@/lib/utils";
import { getAddressList } from "@/services/address.service";
import { getSessionData } from "@/services/order.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddressCard from "./AddressCard";

interface Props {
  params: { checkoutId: string };
}

export default async function CheckoutPage({ params }: Props) {
  const { checkoutId } = await params;
  if (!checkoutId) redirect("/");

  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).toString();

  // 🚀 Parallel data fetching for performance
  const [sessionData, addressList] = await Promise.all([
    getSessionData({ externalId: checkoutId, cookieHeader }),
    getAddressList({ cookieHeader }),
  ]);

  // 🧮 Derived values
  const subtotal = sessionData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.11);
  const totalAmount = subtotal + tax + sessionData.shippingFee;

  return (
    <div className="min-h-screen py-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-4xl space-y-4 px-4 md:px-2">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          <p className="text-xs text-gray-500">Checkout IaD · {checkoutId}</p>
        </header>

        {/* Address Section */}
        <section className="p-5 bg-white rounded-md shadow-sm">
          <h2 className="mb-1 text-md font-semibold text-gray-700">
            Alamat Pengiriman
          </h2>

          {addressList.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada alamat tersimpan</p>
          ) : (
            <AddressCard
              addressList={addressList}
              selectedAddress={addressList.find(
                (a) => a.id === sessionData.addressId
              )}
              totalAddress={addressList.length}
            />
          )}
        </section>

        {/* Items Section */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Item Pesanan
          </h2>

          {sessionData.items.length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada item</p>
          ) : (
            <div className="divide-y">
              {sessionData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <SafeImage
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.variantName}
                    width={64}
                    height={64}
                    className="rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.variantName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} {item.quantityType}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatIDR(item.price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatIDR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Summary */}
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Ringkasan Pembayaran
          </h2>
          <div className="space-y-2 text-sm">
            <SummaryRow
              label={`Total Harga (${sessionData.items.length} Barang)`}
              value={subtotal}
            />
            <SummaryRow label="Pajak (11%)" value={tax} />
            <SummaryRow label="Ongkos Kirim" value={sessionData.shippingFee} />
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <span>Total Tagihan</span>
              <span>{formatIDR(totalAmount)}</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="sticky bottom-0 bg-gray-50 py-4">
          <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700">
            Konfirmasi Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}

({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span>{formatIDR(value)}</span>
    </div>
  );
};

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-gray-600">
      <span>{label}</span>
      <span>{formatIDR(value)}</span>
    </div>
  );
}
