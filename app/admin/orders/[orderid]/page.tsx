import { getOrderDetail } from "@/services/order.service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Truck,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { StatusUpdater } from "./status-updater";
import { SafeImage } from "@/components/SafeImage";
import { OrderStatus } from "@/types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderid: string }>;
}) {
  const { orderid } = await params;
  const cookieStore = await cookies();

  let order;
  try {
    order = await getOrderDetail({
      cookieHeader: cookieStore.toString(),
      externalId: orderid,
    });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    notFound();
  }

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Pesanan #{order.invoiceNumber || order.externalId}
            </h1>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            {formatDate(order.timestamps.createdAt)}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Package size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Rincian Item</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4 sm:gap-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <SafeImage
                        src={item.variant.imageUrl || "/placeholder.png"}
                        alt={item.variant.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-base mb-1">
                        {item.variant.productName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Varian: {item.variant.name}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          {item.quantity} x {formatCurrency(item.pricing.price)}
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.pricing.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <CreditCard size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">
                  Rincian Pembayaran
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal Item</span>
                  <span>{formatCurrency(order.pricing.total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Biaya Pengiriman</span>
                  <span>{formatCurrency(0)}</span>{" "}
                  {/* Replace with actual shipping cost if available */}
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    Total Pembayaran
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(order.pricing.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-6">
            {/* Status Action Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Status Pesanan
              </h3>
              <StatusUpdater
                orderId={order.id}
                currentStatus={order.status as OrderStatus}
              />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Terakhir diperbarui: {formatDate(order.timestamps.updatedAt)}
              </p>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <User size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">
                  Informasi Pembeli
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <User size={14} /> Nama
                  </p>
                  <p className="font-medium text-gray-900">
                    {"order.user.name"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <Mail size={14} /> Email
                  </p>
                  <p className="font-medium text-gray-900 break-all">
                    {order.user.id || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <Phone size={14} /> Telepon
                  </p>
                  <p className="font-medium text-gray-900">
                    {order.shipping.address.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Truck size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Pengiriman</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-gray-400 mt-1 flex-shrink-0"
                  />
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <p className="font-medium text-gray-900 mb-1">
                      {order.shipping.address.receiverName}
                    </p>
                    <p>{order.shipping.address.addressLine1}</p>
                    {order.shipping.address.city && (
                      <p>
                        {order.shipping.address.city},{" "}
                        {order.shipping.address.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
