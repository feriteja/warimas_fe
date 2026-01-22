// app/profile/edit/edit-profile-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/user.service";
import { User } from "@/types";
import { Loader2, User as UserIcon } from "lucide-react";
import { z } from "zod";
import { uploadAvatarImage } from "@/lib/uploadImage";

const profileSchema = z.object({
  fullName: z.string().min(1, "Nama Lengkap wajib diisi").optional(),
  bio: z.string().optional(),
  avatarUrl: z.url("URL Avatar tidak valid").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^\d+$/, "Nomor telepon hanya boleh berisi angka")
    .optional(),
  dateOfBirth: z.string().optional(),
});

export default function EditProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [preview, setPreview] = useState<string | null>(
    (user as any).avatarUrl || null,
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    setGeneralError("");

    const formData = new FormData(event.currentTarget);
    let avatarUrl = (user as any).avatarUrl || "";

    const avatarFile = formData.get("avatar") as File;
    if (avatarFile && avatarFile.size > 0) {
      try {
        avatarUrl = await uploadAvatarImage(avatarFile);
      } catch (error) {
        setGeneralError("Gagal mengupload gambar. Pastikan ukuran < 5MB.");
        setIsLoading(false);
        return;
      }
    }

    const data = {
      fullName: formData.get("fullName") as string,
      bio: formData.get("bio") as string,
      avatarUrl: avatarUrl,
      phone: formData.get("phone") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
    };

    const result = profileSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      await updateProfile(result.data);
      router.refresh();
      router.back();
    } catch (e) {
      setGeneralError("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Ubah Profil</h2>
        <p className="text-sm text-gray-500">
          Perbarui informasi pribadi Anda di sini.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            Nama Lengkap
          </label>
          <input
            id="fullName"
            name="fullName"
            defaultValue={user.fullName}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all ${
              errors.fullName
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            defaultValue={(user as any).bio || ""}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all ${
              errors.bio
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            }`}
          />
          {errors.bio && <p className="text-xs text-red-600">{errors.bio}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="avatar" className="text-sm font-medium text-gray-700">
            Foto Profil
          </label>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  <UserIcon size={24} />
                </div>
              )}
            </div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          {errors.avatarUrl && (
            <p className="text-xs text-red-600">{errors.avatarUrl}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Nomor Telepon
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={user.phone || ""}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all ${
                errors.phone
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dateOfBirth"
              className="text-sm font-medium text-gray-700"
            >
              Tanggal Lahir
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              defaultValue={(user as any).dateOfBirth || ""}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all ${
                errors.dateOfBirth
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {generalError && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {generalError}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-green-700 active:scale-95 transition-all disabled:opacity-70"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
