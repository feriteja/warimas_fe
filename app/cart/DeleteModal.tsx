// d:\project\warimas\warimas_fe\app\cart\DeleteModal.tsx
import React from "react";

type Props = {
  isOpen: boolean;
  type: "single" | "bulk";
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteModal({ isOpen, type, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  const title = type === "single" ? "Hapus Barang?" : "Hapus Semua Barang?";
  const message =
    type === "single"
      ? "Apakah Anda yakin ingin menghapus barang ini dari keranjang?"
      : "Apakah Anda yakin ingin menghapus semua barang yang dipilih dari keranjang?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="w-full max-w-md scale-100 transform rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
