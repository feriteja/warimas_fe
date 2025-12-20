"use client";
import Image from "next/image";

// Dummy data: list of orders
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-10-12",
    status: "Selesai",
    total: 52000,
    items: [
      {
        id: 1,
        name: "Product Satu",
        price: 12000,
        qty: 1,
        img: "https://via.placeholder.com/200/200?1",
      },
      {
        id: 2,
        name: "Product Dua",
        price: 20000,
        qty: 2,
        img: "https://via.placeholder.com/200/200?2",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-10-10",
    status: "Dikirim",
    total: 18000,
    items: [
      {
        id: 3,
        name: "Product Tiga",
        price: 9000,
        qty: 2,
        img: "https://via.placeholder.com/200/200?3",
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen w-full  bg-gradient-to-b from-gray-50 to-gray-100  p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-xl font-bold">Daftar Pesanan</h1>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-4"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full font-semibold
                  ${
                    order.status === "Selesai"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {order.status}
              </span>
            </div>

            {/* ITEMS INSIDE ORDER */}
            <div className="flex flex-col gap-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center border-b pb-4 last:border-none"
                >
                  <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-green-600 font-bold text-sm">
                      Rp {item.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER FOOTER */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-bold">
                Total: Rp {order.total.toLocaleString()}
              </p>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold"
                onClick={() => (window.location.href = `/orders/${order.id}`)}
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
