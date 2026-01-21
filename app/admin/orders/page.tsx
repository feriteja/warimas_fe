import { getOrderList } from "@/services/order.service";
import {
  Order,
  OrderFilterInput,
  OrderList,
  OrderPaginationInput,
  OrderSortInput,
  OrderStatus,
} from "@/types";
import { cookies } from "next/headers";
import {
  Calendar,
  MapPin,
  Package,
  User,
  CreditCard,
  Truck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import {
  OrderFilters,
  OrderPagination,
} from "@/components/orders/components/client";
import Link from "next/link";
import ActionButton from "@/components/orders/ActionButton";
import { Suspense } from "react";

const LIMIT = 10;

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fetchOrders = async ({
  cookieHeader,
  filter,
  pagination,
  sort,
}: {
  cookieHeader?: string;
  filter?: OrderFilterInput;
  sort?: OrderSortInput;
  pagination?: OrderPaginationInput;
}): Promise<OrderList> => {
  try {
    const data = await getOrderList({
      cookieHeader,
      filter,
      pagination,
      sort,
    });
    if (!data) {
      // Memastikan kita selalu memberikan error jika API tidak mengembalikan data
      throw new Error("Tidak ada data yang diterima dari server.");
    }
    return data;
  } catch (error) {
    console.error("Gagal mengambil kategori:", error);
    // Melempar kembali error agar bisa ditangkap oleh logika komponen
    throw error;
  }
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
    sortDirection?: "ASC" | "DESC";
    sortField?: "CREATED_AT" | "TOTAL";
  }>;
}) {
  const cookieStore = await cookies();

  // 1. Await the searchParams object
  const params = await searchParams;

  // 2. Parse Query Params for initial filter state
  const status = params.status || "ALL";
  const search = params.search || "";

  const suspenseKey = JSON.stringify(params);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Manajemen Pesanan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Pantau dan kelola semua pesanan masuk di satu tempat.
            </p>
          </div>
        </div>

        {/* Filters & Content */}
        <div className="space-y-6">
          <OrderFilters initialSearch={search} initialStatus={status} />

          <Suspense key={suspenseKey} fallback={<AdminOrderListSkeleton />}>
            <AdminOrderListContent
              params={params}
              cookieHeader={cookieStore.toString()}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function AdminOrderListContent({
  params,
  cookieHeader,
}: {
  params: {
    page?: string;
    status?: string;
    search?: string;
    sortDirection?: "ASC" | "DESC";
    sortField?: "CREATED_AT" | "TOTAL";
  };
  cookieHeader: string;
}) {
  const page = Number(params.page) || 1;
  const status = params.status || "ALL";
  const search = params.search || "";
  const sortDirection = params.sortDirection || "DESC";
  const sortField = params.sortField || "CREATED_AT";

  const filter: OrderFilterInput = {};
  if (status !== "ALL") {
    filter.status = status as OrderStatus;
  }
  if (search) {
    filter.search = search;
  }

  let orders: any[] = [];
  let totalPages = 1;
  let error = null;

  try {
    const data = await fetchOrders({
      cookieHeader,
      filter,
      pagination: { page, limit: LIMIT },
      sort: { direction: sortDirection, field: sortField },
    });
    orders = data.items;
    totalPages = data.pageInfo.totalPages;
  } catch (err) {
    error = err;
  }

  return (
    <>
      <div className="space-y-4">
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-red-100 shadow-sm text-center p-6">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Gagal memuat data
            </h3>
            <p className="text-gray-500 mt-1 max-w-md">
              Terjadi kesalahan saat mengambil data pesanan. Silakan coba muat
              ulang halaman.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        )}
      </div>

      {!error && orders.length > 0 && (
        <OrderPagination page={page} totalPages={totalPages} />
      )}
    </>
  );
}

function AdminOrderListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl h-64"
        >
          <div className="px-6 py-4 border-b border-gray-100 h-16 bg-gray-50/30"></div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="md:col-span-5 space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderItem({ order }: { order: Order }) {
  console.log({ order });

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white rounded-lg border border-gray-200 shadow-sm text-blue-600">
            <Package size={20} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-bold text-gray-900 tracking-tight">
                #{order.invoiceNumber || order.externalId}
              </span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Calendar size={14} />
              <span>{formatDate(order.timestamps.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
            Total Pembayaran
          </p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(order.pricing.total)}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Customer Info */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <User size={14} /> Informasi Pembeli
          </h4>
          <div>
            <p className="font-semibold text-gray-900">Pembeli</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {/* Placeholder for email if not available in type */}
              ID: {order.user.id}
            </p>
          </div>
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <MapPin size={14} className="text-gray-500" />
              </div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Alamat Pengiriman
              </h4>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-medium text-gray-900">
                {order.shipping.address.receiverName}
              </p>
              <p className="mt-1">{order.shipping.address.addressLine1}</p>

              {order.shipping.address.city && (
                <p className="mt-1 text-gray-600">
                  {order.shipping.address.city},{" "}
                  {order.shipping.address.postalCode}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="md:col-span-5 space-y-3 md:border-l md:border-gray-100 md:pl-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Package size={14} /> Rincian Item
          </h4>
          <div className="space-y-3">
            {order.items.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start group/item"
              >
                <div className="flex-1 pr-4">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1 group-hover/item:text-blue-600 transition-colors">
                    {item.variant.productName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.variant.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    x{item.quantity}
                  </p>
                </div>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-xs font-medium text-blue-600 pt-1">
                +{order.items.length - 3} item lainnya
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-3 flex flex-col justify-center gap-2 md:border-l md:border-gray-100 md:pl-6">
          <ActionButton
            variant="primary"
            icon={<ArrowUpRight size={16} />}
            href={`/admin/orders/${order.externalId}`}
          >
            Lihat Detail
          </ActionButton>
          <div className="h-px bg-gray-100 my-1" />
          {order.status === OrderStatus.PENDING_PAYMENT && (
            <ActionButton
              orderId={order.id}
              changeStatus={OrderStatus.PAID}
              variant="outline"
            >
              Verifikasi Bayar
            </ActionButton>
          )}
          {order.status === OrderStatus.PAID && (
            <ActionButton
              orderId={order.id}
              changeStatus={OrderStatus.ACCEPTED}
              variant="outline"
            >
              Proses Pesanan
            </ActionButton>
          )}
          {order.status === OrderStatus.ACCEPTED && (
            <ActionButton
              orderId={order.id}
              changeStatus={OrderStatus.SHIPPED}
              variant="outline"
            >
              Kirim Pesanan
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-100",
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100",
    PROCESSED: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-100",
    SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-100",
    COMPLETED: "bg-slate-50 text-slate-700 border-slate-200 ring-slate-100",
    CANCELLED: "bg-red-50 text-red-700 border-red-200 ring-red-100",
    RETURNED: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-100",
    ALL: "bg-gray-50 text-gray-700 border-gray-200 ring-gray-100",
  };

  const icons: Record<string, React.ReactNode> = {
    PENDING: <Clock size={12} />,
    PAID: <CreditCard size={12} />,
    PROCESSED: <Package size={12} />,
    SHIPPED: <Truck size={12} />,
    COMPLETED: <CheckCircle2 size={12} />,
    CANCELLED: <XCircle size={12} />,
    RETURNED: <AlertCircle size={12} />,
  };

  const style = styles[status] || styles.ALL;
  const icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ring-1 ring-inset ${style}`}
    >
      {icon}
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Package className="text-gray-400" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Belum ada pesanan</h3>
      <p className="text-gray-500 mt-1 max-w-sm">
        Saat ini belum ada pesanan yang sesuai dengan filter yang Anda pilih.
      </p>
    </div>
  );
}
