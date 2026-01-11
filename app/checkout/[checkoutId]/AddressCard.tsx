"use client";

import { updateCheckoutSessionData } from "@/services/order.service";
import { AddressType } from "@/types";
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
  const [newselectedAddress, setNewSelectedAddress] = useState<
    AddressType | undefined
  >(selectedAddress);

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="text-sm">
          <p className="font-bold ">Alamat {newselectedAddress?.name}</p>
          <p className="text-[#212121 font-medium]">
            {newselectedAddress?.phone}
          </p>
          <p className="text-[#212121 font-medium]">
            {newselectedAddress?.addressLine1}
          </p>
          {newselectedAddress?.addressLine2 && (
            <p className="text-gray-400">{newselectedAddress.addressLine2}</p>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Pilih alamat lain ({totalAddress})
        </button>
      </div>

      {open && (
        <AddressModal
          addressList={addressList}
          onClose={() => setOpen(false)}
          onAddressSelected={(address) => setNewSelectedAddress(address)}
        />
      )}
    </>
  );
}

function AddressModal({
  onClose,
  addressList,
  onAddressSelected,
}: {
  addressList: AddressType[];
  onAddressSelected: (ad: AddressType) => void;
  onClose: () => void;
}) {
  const [tempSelectedId, setTempSelectedId] = useState<string | null>(null);
  const params = useParams();
  const checkoutId = params.checkoutId as string;
  const router = useRouter();

  const onChangeCheckoutSessionAddress = async (
    address: AddressType | null
  ) => {
    if (!tempSelectedId || !checkoutId || !address) return;
    onAddressSelected(address);
    await updateCheckoutSessionData({
      addressId: tempSelectedId,
      externalId: checkoutId as string,
    });
    router.refresh();
  };

  if (addressList.length < 1 || !addressList) return;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center">
      <div className="flex w-full max-w-md flex-col rounded-t-2xl bg-white md:rounded-2xl">
        {/* Sticky Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-4 py-3">
          <p className="text-sm font-semibold">Pilih Alamat</p>
          <button
            onClick={onClose}
            className="text-sm font-medium text-gray-500"
          >
            Batal
          </button>
        </div>

        {/* Address List */}
        <div className="flex-1 max-h-[75vh] overflow-y-auto px-4 py-3 space-y-3">
          {addressList.map((addr) => {
            const selected = tempSelectedId === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => setTempSelectedId(addr.id)}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  selected ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-medium">{addr.name}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-600">{addr.addressLine1}</p>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 text-xs font-medium text-gray-500"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 space-y-2 border-t bg-white px-4 py-3">
          <button
            disabled={!tempSelectedId}
            onClick={() => {
              onChangeCheckoutSessionAddress(
                addressList.find((a) => a.id === tempSelectedId) || null
              );
              onClose();
            }}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Konfirmasi Alamat
          </button>

          <button className="w-full rounded-xl border py-2 text-sm font-medium">
            Tambah Alamat Baru
          </button>
        </div>
      </div>
    </div>
  );
}
