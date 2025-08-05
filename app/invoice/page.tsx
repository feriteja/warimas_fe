"use client";

import { useCart } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const generateInvoiceId = () => "INV-" + Date.now().toString().slice(-6);

export default function InvoicePage() {
  const { items, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [invoiceId] = useState(generateInvoiceId());
  const router = useRouter();

  useEffect(() => {
    const calculated = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculated);
  }, [items]);

  const handleConfirm = () => {
    alert("✅ Invoice confirmed!");
    clearCart();
    router.push("/");
  };

  const formatCurrency = (amount: number) =>
    "Rp " + amount.toLocaleString("id-ID");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-8 border">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">🧾 Invoice</h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Invoice ID</p>
            <p className="font-semibold text-gray-700">{invoiceId}</p>
          </div>
        </div>

        {/* Table */}
        {items.length === 0 ? (
          <p className="text-gray-500 text-lg mt-10">No items in your cart.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-gray-600 uppercase text-xs tracking-wider">
                    <th className="px-2 py-2">Product</th>
                    <th className="px-2 py-2">Variant</th>
                    <th className="px-2 py-2">Qty</th>
                    <th className="px-2 py-2">Price</th>
                    <th className="px-2 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.variantId}
                      className="bg-gray-50 rounded-md shadow-sm"
                    >
                      <td className="px-2 py-3 font-medium">
                        {item.productName}
                      </td>
                      <td className="px-2 py-3">{item.variantName}</td>
                      <td className="px-2 py-3">
                        {item.quantity} {item.quantityType}
                      </td>
                      <td className="px-2 py-3">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-2 py-3 text-right font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mt-8">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleConfirm}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                ✅ Confirm Invoice
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
