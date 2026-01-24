import { getOrderDetail } from "@/services/order.service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { formatIDR } from "@/lib/utils";
import InvoiceActions from "./InvoiceActions";

interface PageProps {
  params: { orderId: string };
}

export default async function InvoicePage({ params }: PageProps) {
  const cookieStore = await cookies();
  const orderId = params.orderId;

  const order = await getOrderDetail({
    externalId: orderId,
    cookieHeader: cookieStore.toString(),
  });

  if (!order) {
    notFound();
  }

  console.log({ order });

  const { shipping, pricing, items, timestamps } = order;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8 font-sans text-slate-900 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden print:shadow-none print:max-w-none print:rounded-none border border-slate-200">
        {/* Header / Actions (hidden in print) */}
        <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
          <div className="text-slate-100 text-sm font-medium">
            Detail Faktur Pesanan #{order.externalId}
          </div>
          <InvoiceActions />
        </div>

        {/* Invoice Content */}
        <div className="p-6 sm:p-10 print:p-8">
          {/* Top Section: Logo & Invoice Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-8 border-b border-slate-100 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                  W
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Warimas
                </h1>
              </div>
              <p className="text-slate-500 font-medium text-sm">
                Premium Quality Goods
              </p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <h2 className="text-3xl font-bold text-slate-200 uppercase tracking-widest mb-4">
                Faktur
              </h2>
              <div className="space-y-1.5">
                <div className="flex justify-between sm:justify-end gap-8">
                  <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    No. Faktur
                  </span>
                  <span className="text-slate-900 font-bold font-mono">
                    {order.invoiceNumber || "-"}
                  </span>
                </div>
                <div className="flex justify-between sm:justify-end gap-8">
                  <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    Tanggal
                  </span>
                  <span className="text-slate-900 font-medium">
                    {new Date(timestamps.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex justify-between sm:justify-end gap-8">
                  <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    Status
                  </span>
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                      order.status === "PAID" || order.status === "COMPLETED"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Tagihan Kepada
              </h3>
              <div className="text-slate-900 font-bold text-base mb-1">
                {shipping.address.receiverName}
              </div>
              <div className="text-slate-600 text-sm leading-relaxed space-y-0.5">
                <p>{shipping.address.addressLine1}</p>
                {shipping.address.addressLine2 && (
                  <p>{shipping.address.addressLine2}</p>
                )}
                <p>
                  {shipping.address.city}, {shipping.address.province}{" "}
                  {shipping.address.postalCode}
                </p>
                <p className="pt-2 flex items-center gap-2 text-slate-500">
                  <span className="text-xs uppercase font-semibold">Telp:</span>
                  {shipping.address.phone}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 md:text-right">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Dari
              </h3>
              <div className="text-slate-900 font-bold text-base mb-1">
                Warimas Store
              </div>
              <div className="text-slate-600 text-sm leading-relaxed space-y-0.5">
                <p>Jl. Raya Utama No. 123</p>
                <p>Jakarta Selatan, DKI Jakarta 12345</p>
                <p>Indonesia</p>
                <p className="pt-2 text-emerald-600 font-medium">
                  support@warimas.com
                </p>
              </div>
            </div>
          </div>

          {/* Items Table - Desktop */}
          <div className="hidden sm:block mb-10 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Deskripsi Barang
                  </th>
                  <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Jml
                  </th>
                  <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Harga
                  </th>
                  <th className="py-3 px-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">
                        {item.variant.productName}
                      </div>
                      <div className="text-sm text-slate-500 mt-0.5">
                        {item.variant.name}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right text-slate-700 font-medium">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-5 text-right text-slate-700">
                      {formatIDR(item.pricing.price)}
                    </td>
                    <td className="py-4 px-5 text-right font-bold text-slate-900">
                      {formatIDR(item.pricing.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Items List - Mobile */}
          <div className="sm:hidden space-y-4 mb-10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Rincian Barang
            </h3>
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {item.variant.productName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.variant.name}
                    </div>
                  </div>
                  <div className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                    x{item.quantity}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-50 mt-2">
                  <span className="text-slate-500">Harga Satuan</span>
                  <span className="text-slate-700">
                    {formatIDR(item.pricing.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-slate-500 font-medium">Total</span>
                  <span className="text-slate-900 font-bold">
                    {formatIDR(item.pricing.subtotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="flex flex-col sm:flex-row justify-end mb-10">
            <div className="w-full sm:w-1/2 lg:w-5/12 space-y-3">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">
                  {formatIDR(pricing.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Biaya Pengiriman</span>
                <span className="font-medium text-slate-900">
                  {formatIDR(pricing.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Pajak (11%)</span>
                <span className="font-medium text-slate-900">
                  {formatIDR(pricing.tax)}
                </span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-600 text-sm">
                  <span>Diskon</span>
                  <span className="font-medium">
                    -{formatIDR(pricing.discount)}
                  </span>
                </div>
              )}
              <div className="border-t-2 border-slate-100 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {formatIDR(pricing.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 pt-8 text-center">
            <h4 className="text-slate-900 font-bold mb-2">
              Terima kasih atas kepercayaan Anda!
            </h4>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Jika Anda memiliki pertanyaan tentang faktur ini, silakan hubungi
              kami di{" "}
              <span className="text-emerald-600 font-medium">
                support@warimas.com
              </span>
            </p>
            <p className="text-slate-400 text-xs mt-8">
              &copy; {new Date().getFullYear()} Warimas. Hak cipta dilindungi
              undang-undang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
