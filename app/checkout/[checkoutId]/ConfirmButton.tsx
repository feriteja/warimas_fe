"use client";
import { confirmCheckoutSession } from "@/services/order.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function ConfirmButton({ externalId }: { externalId: string }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    setIsPending(true);
    try {
      const res = await confirmCheckoutSession({ externalId });
      router.replace(`/checkout/payment/${res.order_external_id}`);
    } catch (e) {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full border-t bg-white/80 p-4 backdrop-blur-md lg:relative lg:border-none lg:bg-transparent lg:p-0">
      <button
        onClick={handleConfirm}
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-white shadow-xl transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
      >
        <Lock size={18} />
        <span className="font-bold">
          {isPending ? "Memproses..." : "Bayar Sekarang"}
        </span>
      </button>
      <p className="mt-2 text-center text-[10px] text-gray-400 uppercase tracking-widest lg:hidden">
        Secure Checkout Powered by IaD
      </p>
    </div>
  );
}
