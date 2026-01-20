import { PaymentDetail, PaymentMethod, PaymentStatus } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { CopyButton } from "@/components/CopyButton";
import { PaymentQRCode } from "./QRCode";

interface PaymentDetailsProps {
  payment?: PaymentDetail;
  status: PaymentStatus;
  payid: string;
}

export function PaymentDetails({
  payment,
  status,
  payid,
}: PaymentDetailsProps) {
  const paymentMethod = payment?.method;
  const eWalletMethods = [
    PaymentMethod.MethodOVO,
    PaymentMethod.MethodDANA,
    PaymentMethod.MethodLINKAJA,
    PaymentMethod.MethodSHOPEE,
    PaymentMethod.MethodGOPAY,
  ];

  const isEwallet = paymentMethod && eWalletMethods.includes(paymentMethod);
  const isQris = paymentMethod === PaymentMethod.MethodQRIS;
  const isCard = paymentMethod === PaymentMethod.MethodCreditCard;
  const isCod = paymentMethod === PaymentMethod.MethodCOD;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Detail Pembayaran</h2>
            <h3 className="text-gray-400 text-sm">{payid}</h3>
          </div>
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="p-6">
        {payment ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <DetailItem label="Metode Pembayaran" value={payment.method} />
              <DetailItem label="Bank Name" value={payment.bank} />
            </div>

            {isEwallet && payment.invoiceURL && (
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Link Pembayaran
                </p>
                <a
                  href={payment.invoiceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold break-all hover:underline"
                >
                  Klik untuk membayar
                </a>
              </div>
            )}

            {isQris && payment.paymentCode && (
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-center">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pindai untuk Membayar
                </p>
                <div className="flex justify-center">
                  <PaymentQRCode value={payment.paymentCode} />
                </div>
              </div>
            )}

            {isCard && (
              <div className="rounded-xl bg-blue-50 p-4 border border-blue-100 text-center">
                <p className="text-sm font-medium text-blue-700">
                  Pembayaran kartu Anda sedang diproses. Anda akan menerima
                  notifikasi setelah selesai.
                </p>
              </div>
            )}

            {isCod && (
              <div className="rounded-xl bg-green-50 p-4 border border-green-100 text-center">
                <p className="text-sm font-medium text-green-700">
                  Pesanan Anda akan dibayar saat pengiriman. Mohon siapkan uang
                  tunai.
                </p>
              </div>
            )}

            {!isEwallet &&
              !isQris &&
              !isCard &&
              !isCod &&
              payment.paymentCode && (
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Kode Bayar
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-bold text-indigo-600">
                      {payment.paymentCode}
                    </span>
                    <CopyButton text={payment.paymentCode} />
                  </div>
                </div>
              )}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">
            No payment details available.
          </p>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
