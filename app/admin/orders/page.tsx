import {
  OrderFilters,
  OrderPagination,
} from "@/components/orders/components/client";
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

const LIMIT = 20;

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

  // 1. Await the searchParams object FIRST
  const params = await searchParams;

  // 2. Parse Query Params from the resolved object
  // Note: Number(undefined) is NaN, and NaN || 1 is 1. This is safe.
  const page = Number(params.page) || 1;
  const status = params.status || "ALL";
  const search = params.search || "";
  const sortDirection = params.sortDirection || "DESC";
  const sortField = params.sortField || "CREATED_AT";
  // 2. Prepare Filters
  const filter: OrderFilterInput = {};
  if (status !== "ALL") {
    filter.status = status as OrderStatus;
  }
  if (search) {
    // Assuming the API supports filtering by buyer name via this field
    filter.search = search;
  }

  // 3. Fetch Data
  let orders: any[] = [];
  let totalPages = 1;
  let error = null;

  try {
    const data = await fetchOrders({
      cookieHeader: cookieStore.toString(),
      filter,
      pagination: { page, limit: LIMIT },
      sort: { direction: sortDirection, field: sortField },
    });
    orders = data.items;
    totalPages = data.pageInfo.totalPages;
  } catch (err) {
    error = err;
  }

  console.log({ orders });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Orders</h1>

      <OrderFilters initialSearch={search} initialStatus={status} />

      {/* Order List */}
      <div className="mt-4 space-y-4">
        {error ? (
          <div className="text-center py-12 bg-red-50 text-red-600 rounded-xl border border-red-100">
            Gagal memuat data pesanan. Silakan coba lagi nanti.
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 mt-6 text-center">
            Tidak ada pesanan untuk status ini.
          </p>
        ) : (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        )}
      </div>

      {/* Pagination Controls */}
      {!error && orders.length > 0 && (
        <OrderPagination page={page} totalPages={totalPages} />
      )}
    </div>
  );
}

function OrderItem({ order }: { order: Order }) {
  const shownItems = order.items.slice(0, 2);
  const remaining = order.items.length - 2;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-medium text-gray-900">{"buyer"}</p>
          <p className="text-sm text-gray-500">Penjual: {"order.seller"}</p>
        </div>
        <span className="text-sm text-gray-400">
          {order.invoiceNumber || order.externalId}
        </span>
      </div>

      <div className="text-sm text-gray-700 mb-1">
        <strong>Barang:</strong>{" "}
        {shownItems.map((it) => it.variant.name).join(", ")}
        {remaining > 0 && (
          <span className="text-gray-500"> +{remaining} lainnya</span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-2">
        {order.shipping.address.addressLine1}
      </p>

      <p className="font-semibold text-gray-900 mb-3">
        Rp {order.pricing.total.toLocaleString("id-ID")}
      </p>

      <div className="flex gap-2">
        <StatusButton label="Proses" />
        <StatusButton label="Kirim" />
        <StatusButton label="Batalkan" />
        <StatusButton label="Retur" />
      </div>
    </div>
  );
}

function StatusButton({ label }: { label: string }) {
  return (
    <button className="px-3 py-1.5 text-sm rounded-lg border bg-gray-50 hover:bg-gray-100 text-gray-700 transition">
      {label}
    </button>
  );
}

/* ---------------------------------------------------
   Skeleton Loader
----------------------------------------------------- */
function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white border rounded-xl p-4 space-y-3"
        >
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-52 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>

          <div className="flex gap-2 mt-3">
            <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </>
  );
}
