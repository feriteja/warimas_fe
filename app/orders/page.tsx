import {
  OrderFilters,
  OrderPagination,
} from "@/components/orders/components/client";
import { SafeImage } from "@/components/SafeImage";
import { getOrderList } from "@/services/order.service";
import { Order, OrderFilterInput, OrderStatus } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";

// Helper for currency formatting
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Helper for date formatting
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string; search?: string };
}) {
  const cookieStore = await cookies();

  // 1. Parse Query Param (SSR)
  const currentPage = Number(searchParams.page) || 1;
  const status = searchParams.status || "ALL";
  const search = searchParams.search || "";

  // 2. Prepare Filter
  const filter: OrderFilterInput = {};
  if (status !== "ALL") {
    filter.status = status as OrderStatus;
  }
  // Note: Add search filter mapping if supported by API, e.g., filter.search = search;

  // 3. Fetch Data (Server-side)
  const orderList = await getOrderList({
    cookieHeader: cookieStore.toString(),
    pagination: { page: currentPage },
    filter,
  });
  const { items, pageInfo } = orderList;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Riwayat Pesanan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola pembelian dan faktur terbaru Anda
            </p>
          </div>
          <div className="text-right">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-400">
              Total Pesanan: {pageInfo.totalItems}
            </span>
          </div>
        </div>

        {/* Filters */}
        <OrderFilters initialSearch={search} initialStatus={status} />

        {/* Order List */}
        <div className="space-y-6">
          {items.map((order) => (
            <Link key={order.externalId} href={`/orders/${order.externalId}`}>
              <OrderCard order={order} />
            </Link>
          ))}

          {items.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
              Tidak ada pesanan.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <OrderPagination
          page={pageInfo.page}
          totalPages={pageInfo.totalPages}
        />
      </div>
    </div>
  );
}

// --- Component: Individual Order Card ---
// We can keep this in the same file for simplicity or move to /components
function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Card Header */}
      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
            Pesanan dibuat
          </div>
          <div className="text-sm text-gray-900 font-medium">
            {formatDate(order.timestamps.createdAt)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
            Total
          </div>
          <div className="text-sm text-gray-900 font-medium">
            {formatCurrency(order.pricing.total, order.pricing.currency)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
            Kirim ke
          </div>
          <div className="text-sm text-gray-900 font-medium truncate max-w-[150px]">
            {order.shipping.address.name}
          </div>
        </div>
        <div className="text-right sm:ml-auto">
          <span className="text-xs text-gray-400">#{order.externalId}</span>
        </div>
      </div>

      {/* Card Body (Items) */}
      <div className="p-6">
        <ul className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <li key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative border border-gray-200">
                {/* Use Next/Image for real implementation */}
                <SafeImage
                  src={item.variant.imageUrl || "/placeholder.png"}
                  alt={item.variant.productName}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.variant.productName}
                </h3>
                <p className="text-sm text-gray-500">{item.variant.name}</p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>
                    Jml: {item.quantity} {item.quantityType.toLowerCase()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(item.pricing.price, order.pricing.currency)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer (Actions) */}
      {/* <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end gap-3">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Lihat Faktur
        </button>
        <div className="h-4 w-px bg-gray-300 self-center"></div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Lacak Paket
        </button>
      </div> */}
    </div>
  );
}
