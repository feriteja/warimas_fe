"use client";

import { useState } from "react";
import { reorder, saveOrderAsPackage } from "./actions";
import { Order } from "@/types";
import SavePackageModal from "./SavePackageModal";
import { Loader2 } from "lucide-react";

export default function OrderActionButtons({ order }: { order: Order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const handleSavePackage = async (name: string) => {
    return await saveOrderAsPackage(name, order.items);
  };

  const handleBuyAgain = async () => {
    try {
      setIsReordering(true);
      const res = await reorder(order.items);

      setIsReordering(false);
    } catch (error) {
      setIsReordering(false);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <button
          onClick={handleBuyAgain}
          disabled={isReordering}
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-all flex justify-center items-center gap-2"
        >
          {isReordering && <Loader2 className="w-4 h-4 animate-spin" />}
          Beli Lagi
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg shadow-sm transition-all flex justify-center items-center gap-2"
        >
          Simpan Paket
        </button>
      </div>

      <SavePackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePackage}
        defaultName={`Paket dari Pesanan #${order.externalId}`}
      />
    </>
  );
}
