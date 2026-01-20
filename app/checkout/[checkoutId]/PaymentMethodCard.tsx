// d:\project\warimas\warimas_fe\app\checkout\[checkoutId]\PaymentMethodCard.tsx

"use client";

import { PaymentMethod } from "@/types";
import { useState, useTransition } from "react";
import { updatePaymentMethod } from "./actions";
import { updatePaymentMethodeCheckoutSessionData } from "@/services/order.service";
import { useRouter } from "next/navigation";

interface Props {
  selectedMethod?: PaymentMethod;
  externalId: string;
  status: string;
}

export default function PaymentMethodCard({
  selectedMethod,
  externalId,
  status,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    selectedMethod,
  );

  const handleSelect = (method: PaymentMethod) => {
    startTransition(async () => {
      await updatePaymentMethodeCheckoutSessionData({
        externalId,
        paymentMethod: method,
      });
      setPaymentMethod(method);
      setIsOpen(false);
      router.refresh();
    });
  };

  const paymentGroups = [
    {
      title: "Virtual Account",
      methods: [
        { label: "BCA Virtual Account", value: PaymentMethod.MethodBCAVA },
        { label: "BNI Virtual Account", value: PaymentMethod.MethodBNIVA },
        {
          label: "Mandiri Virtual Account",
          value: PaymentMethod.MethodMandiriVA,
        },
      ],
    },
    {
      title: "E-Wallet & QRIS",
      methods: [
        { label: "QRIS", value: PaymentMethod.MethodQRIS },
        { label: "GoPay", value: PaymentMethod.MethodGOPAY },
        { label: "OVO", value: PaymentMethod.MethodOVO },
        { label: "Dana", value: PaymentMethod.MethodDANA },
        { label: "ShopeePay", value: PaymentMethod.MethodSHOPEE },
        { label: "LinkAja", value: PaymentMethod.MethodLINKAJA },
      ],
    },
    {
      title: "Retail Outlet",
      methods: [
        { label: "Indomaret", value: PaymentMethod.ChannelIndomaret },
        { label: "Alfamart", value: PaymentMethod.ChannelAlfamart },
      ],
    },
  ];

  const selectedLabel = paymentGroups
    .flatMap((g) => g.methods)
    .find((m) => m.value === paymentMethod)?.label;

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Metode Pembayaran</h2>
        {status !== "EXPIRED" && status !== "PAID" && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {isOpen ? "Tutup" : "Ubah"}
          </button>
        )}
      </div>

      {!isOpen ? (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {selectedLabel || "Pilih Metode Pembayaran"}
            </p>
            <p className="text-sm text-gray-500">
              {paymentMethod ? "Metode pembayaran terpilih" : "Belum dipilih"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {paymentGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="grid gap-3">
                {group.methods.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => handleSelect(method.value)}
                    disabled={isPending}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left w-full ${
                      paymentMethod === method.value
                        ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600/20"
                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900 flex-1">
                      {method.label}
                    </span>
                    {paymentMethod === method.value && (
                      <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
