import { notFound } from "next/navigation";
import { formatIDR } from "@/lib/utils";
import {
  ChevronLeft,
  Printer,
  HelpCircle,
  CheckCircle2,
  Circle,
  Package,
  CreditCard,
  MapPin,
  User,
  Phone,
} from "lucide-react";
import Link from "next/link";
import HeaderProgressTrackVertical from "@/components/orders/HeaderProgressTrackVertical";
import HeaderProgressTrackHorizontal from "@/components/orders/HeaderProgressTrackHorizontal";
import { cookies } from "next/headers";
import { getOrderDetail } from "@/services/order.service";

interface PageProps {
  params: { orderId: string };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const orderId = params.orderId;

  const response = await getOrderDetail({
    externalId: orderId,
    cookieHeader: cookieStore.toString(),
  });
  if (!response || !response) notFound();

  const order = response;
  const { shipping, pricing, items, user } = order;

  return (
    <main className="min-h-screen bg-gray-100/80 py-8 px-4 sm:px-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 1. TOP NAVIGATION & ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/orders"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Kembali ke Pesanan
          </Link>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Printer className="w-4 h-4" />
              Faktur
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <HelpCircle className="w-4 h-4" />
              Bantuan
            </button>
          </div>
        </div>

        {/* 2. HEADER & PROGRESS TRACKER */}
        <div className="hidden md:block">
          <HeaderProgressTrackHorizontal order={order} />
        </div>
        <div className="md:hidden">
          <HeaderProgressTrackVertical order={order} />
        </div>

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: ITEMS & SHIPPING (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Barang Dipesan</h3>
                <span className="text-sm text-gray-500">
                  {items.length} barang
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-md border border-gray-200 flex-shrink-0 overflow-hidden">
                      {item.variant.imageUrl ? (
                        <img
                          src={item.variant.imageUrl}
                          alt={item.variant.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="w-8 h-8 opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-lg">
                        {item.variant.productName}
                      </h4>
                      <p className="text-gray-500 text-sm mb-3">
                        {item.variant.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 inline-flex px-2 py-1 rounded border border-gray-100">
                        <span>Jml: {item.quantity}</span>
                        <span className="text-gray-300">|</span>
                        <span>{formatIDR(item.pricing.price)} / unit</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatIDR(item.pricing.subtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Detail Pengiriman
                </h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-8">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Alamat Pengiriman
                    </p>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p>{shipping.address.addressLine1}</p>
                      {shipping.address.addressLine2 && (
                        <p>{shipping.address.addressLine2}</p>
                      )}
                      <p>
                        {shipping.address.city}, {shipping.address.province}
                      </p>
                      <p>{shipping.address.postalCode}</p>
                      <p className="mt-1 font-medium">
                        {shipping.address.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Info Kontak
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipping.address.receiverName}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      {shipping.address.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR (Span 1) */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">
                  Ringkasan Pesanan
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal Barang</span>
                  <span>{formatIDR(pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Pengiriman</span>
                  <span>{formatIDR(pricing.shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Pajak (11%)</span>
                  <span>{formatIDR(pricing.tax)}</span>
                </div>

                <div className="my-4 border-t border-dashed border-gray-200"></div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Belanja</span>
                  <span className="font-bold text-xl text-gray-900">
                    {formatIDR(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Status Action */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                {order.status === "PENDING_PAYMENT" ? (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-all">
                    Bayar Sekarang
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-green-700 font-medium bg-green-100 py-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                    Pembayaran Berhasil
                  </div>
                )}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Ada pertanyaan?
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Jika ada masalah dengan pesanan Anda, hubungi tim dukungan kami.
              </p>
              <Link
                href="#"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Kunjungi Pusat Bantuan &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
