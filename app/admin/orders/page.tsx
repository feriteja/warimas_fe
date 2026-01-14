import { Search } from "lucide-react";

export default async function AdminOrdersPage() {
  // Pagination logic
  const totalPages = Math.ceil(orders.length / LIMIT);
  const paginated = orders.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Orders</h1>

      {/* Search + Filter */}
      <div className="sticky top-0 bg-gray-50 pb-2 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 w-full bg-white px-4 py-2 rounded-xl border shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari pembeli..."
              className="flex-1 outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ORDER_STATUSES.map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm border transition ${
                statusFilter === item.key
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="mt-4 space-y-4">
        {loading ? (
          <SkeletonList count={LIMIT} />
        ) : paginated.length === 0 ? (
          <p className="text-gray-500 mt-6 text-center">
            Tidak ada pesanan untuk status ini.
          </p>
        ) : (
          paginated.map((order) => <OrderItem key={order.id} order={order} />)
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && orders.length > 0 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 text-sm bg-white rounded-lg border shadow-sm disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600 mt-2">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm bg-white rounded-lg border shadow-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function OrderItem({ order }: any) {
  const shownItems = order.items.slice(0, 2);
  const remaining = order.items.length - 2;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-medium text-gray-900">{order.buyer}</p>
          <p className="text-sm text-gray-500">Penjual: {order.seller}</p>
        </div>
        <span className="text-sm text-gray-400">{order.id}</span>
      </div>

      <div className="text-sm text-gray-700 mb-1">
        <strong>Barang:</strong> {shownItems.map((it) => it.name).join(", ")}
        {remaining > 0 && (
          <span className="text-gray-500"> +{remaining} lainnya</span>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-2">{order.address}</p>

      <p className="font-semibold text-gray-900 mb-3">
        Rp {order.total.toLocaleString("id-ID")}
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
