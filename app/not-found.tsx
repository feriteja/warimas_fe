// app/orders/[orderId]/not-found.tsx
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function OrderNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The order ID you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/orders"
          className="block w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
}
