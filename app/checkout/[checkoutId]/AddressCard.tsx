"use client";

import { updateCheckoutSessionData } from "@/services/order.service";
import { AddressType } from "@/types";
import { CheckCircle2, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AddressCard({
  selectedAddress,
  totalAddress,
  addressList,
}: {
  selectedAddress?: AddressType;
  totalAddress: number;
  addressList: AddressType[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams<{ checkoutId: string }>();
  if (!params?.checkoutId) return;

  const handleSelect = async (address: AddressType) => {
    try {
      await updateCheckoutSessionData({
        addressId: address.id,
        externalId: params.checkoutId,
      });

      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah alamat. Silakan coba lagi.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <MapPin size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Alamat Pengiriman
              </span>
              {selectedAddress && (
                <CheckCircle2 size={14} className="text-green-500" />
              )}
            </div>
            {!selectedAddress ? (
              <p className="text-sm text-gray-400">Belum ada alamat</p>
            ) : (
              <>
                <p className="mt-1 font-bold text-gray-900">
                  {selectedAddress.name}
                </p>
                <p className="text-sm text-gray-500">{selectedAddress.phone}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {selectedAddress.addressLine1}
                </p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          Ganti
        </button>
      </div>

      {open && (
        <AddressModal
          addressList={addressList}
          selectedId={selectedAddress?.id}
          onClose={() => setOpen(false)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

interface AddressModalProps {
  addressList: AddressType[];
  selectedId?: string | number;
  onClose: () => void;
  onSelect: (address: AddressType) => void;
}
function AddressModal({
  addressList,
  selectedId,
  onClose,
  onSelect,
}: AddressModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Pilih Alamat</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {addressList.map((addr: AddressType) => (
            <div
              key={addr.id}
              onClick={() => onSelect(addr)}
              className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                selectedId === addr.id
                  ? "border-blue-600 bg-blue-50/50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <p className="font-bold text-gray-900">{addr.name}</p>
              <p className="text-sm text-gray-500">{addr.addressLine1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
