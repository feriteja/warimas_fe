"use client";

import { createAddress } from "@/services/address.service";
// import { createAddress } from "@/services/address.service";
import { updateCheckoutSessionData } from "@/services/order.service";
import { AddressType, CreateAddressPayload } from "@/types";
import { CheckCircle2, ChevronLeft, Loader2, MapPin, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AddressCard({
  selectedAddress,
  totalAddress,
  addressList,
  status,
}: {
  status: string;
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

  const handleSuccessAdd = () => {
    router.refresh();
    // Optional: You might want to keep the modal open or close it
    // If you want to auto-select the new address, logic would be needed here
    // For now, just refreshing to show the new address in the list
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
          type="button" // Always specify type to prevent accidental form submissions
          disabled={status !== "PENDING"}
          onClick={() => setOpen(true)}
          className="
    rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide
    transition-all duration-200
    
    bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600
    
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600
  "
        >
          {addressList.length === 0 ? "Tambah" : "Ganti"}
        </button>
      </div>

      {open && (
        <AddressModal
          addressList={addressList}
          selectedId={selectedAddress?.id}
          onClose={() => setOpen(false)}
          onSelect={handleSelect}
          onSuccessAdd={handleSuccessAdd}
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
  onSuccessAdd: () => void;
}

function AddressModal({
  addressList,
  selectedId,
  onClose,
  onSelect,
  onSuccessAdd,
}: AddressModalProps) {
  const [view, setView] = useState<"list" | "add">("list");

  if (view === "add") {
    return (
      <AddAddressForm
        onCancel={() => setView("list")}
        onSuccess={() => {
          setView("list");
          onSuccessAdd();
        }}
      />
    );
  }

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
          {addressList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada alamat tersimpan.
            </div>
          )}

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

          <button
            onClick={() => setView("add")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-4 font-semibold text-blue-600 transition-all hover:border-blue-300 hover:bg-blue-100"
          >
            <Plus size={20} />
            Tambah Alamat Baru
          </button>
        </div>
      </div>
    </div>
  );
}

function AddAddressForm({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAddressPayload>({
    name: "",
    receiverName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    setAsDefault: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await createAddress({
        input: {
          address: {
            name: formData.name,
            receiverName: formData.receiverName,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            country: formData.country,
            phone: formData.phone,
            postalCode: formData.postalCode,
            province: formData.province,
          },
          setAsDefault: formData.setAsDefault,
        },
      }); //Type '{ name: string; receiverName: string; phone: string; addressLine1: string; addressLine2: string; city: string; province: string; postalCode: string; country: string; setAsDefault: boolean; }' is missing the following properties from type 'AddressType': id, isDefaultts(2739)
      // address.ts(16, 3): The expected type comes from property 'address' which is declared here on type 'createAddressInput'
      onSuccess();
    } catch (error) {
      console.error("Failed to create address:", error);
      alert("Gagal menambahkan alamat. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b px-6 py-4 flex items-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h2 className="text-lg font-bold">Tambah Alamat Baru</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] overflow-y-auto p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Label Alamat (Contoh: Rumah, Kantor)
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Rumah"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nama Penerima
                </label>
                <input
                  required
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  No. Telepon
                </label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Alamat Lengkap
              </label>
              <input
                required
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Nama Jalan, No. Rumah, RT/RW"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Detail Lainnya (Opsional)
              </label>
              <input
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Patokan, Gedung, dll"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Kota
                </label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Provinsi
                </label>
                <input
                  required
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Kode Pos
                </label>
                <input
                  required
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Negara
                </label>
                <input
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="setAsDefault"
                name="setAsDefault"
                checked={formData.setAsDefault}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="setAsDefault"
                className="text-sm font-medium text-gray-700"
              >
                Jadikan alamat utama
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-70"
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              Simpan Alamat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
