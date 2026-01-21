"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  Shield,
  Camera,
} from "lucide-react";
import { logout } from "@/services/auth.service";
import { User as UserType } from "@/types";
import { SafeImage } from "@/components/SafeImage";

interface ProfileViewProps {
  user: UserType;
}

export default function ProfileView({ user }: ProfileViewProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-8">
        <div className="group relative">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-sm sm:h-32 sm:w-32">
            {/* Placeholder Avatar */}
            {user.avatarUrl ? (
              <SafeImage src={user.avatarUrl} alt="Avatar" fill />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-green-600">
                <User size={48} />
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 rounded-full bg-green-600 p-2 text-white shadow-md transition-transform hover:scale-105 hover:bg-green-700">
            <Camera size={16} />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {user?.fullName}
          </h1>
          <p className="mt-1 font-medium text-gray-500">{user?.phone}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Member Warimas
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-4 xl:col-span-3">
          <nav className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="space-y-1 p-2">
              <MenuItem
                href="/profile"
                icon={<User size={18} />}
                label="Profil Saya"
                active
              />
              <MenuItem
                href="/orders"
                icon={<Package size={18} />}
                label="Pesanan Saya"
              />
              <MenuItem
                href="/addresses"
                icon={<MapPin size={18} />}
                label="Alamat Tersimpan"
              />
              <MenuItem
                href="/settings"
                icon={<Settings size={18} />}
                label="Pengaturan"
              />
            </div>
            <div className="border-t border-gray-50 p-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={18} />
                Keluar
              </button>
            </div>
          </nav>

          {/* Quick Stats Card */}
          {/* <div className="mt-6 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-6 text-white shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                <Shield size={20} />
              </div>
              <h3 className="font-semibold">Status Akun</h3>
            </div>
            <p className="text-sm text-green-50 opacity-90">
              Akun Anda aman dan terverifikasi. Nikmati belanja tanpa khawatir.
            </p>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Informasi Pribadi
              </h2>
              <Link
                href="/profile/edit"
                scroll={false}
                className="text-sm font-semibold text-green-600 hover:text-green-700"
              >
                Ubah Profil
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoField
                label="Nama Lengkap"
                value={user?.fullName || "-"}
                icon={<User size={16} />}
              />
              <InfoField
                label="Nomor Telepon"
                value={user?.phone || "-"}
                icon={<Phone size={16} />}
              />
              <InfoField
                label="Email"
                value={(user as any)?.email || "Belum diatur"}
                icon={<Mail size={16} />}
              />
              <InfoField
                label="Tanggal Bergabung"
                value="Januari 2024"
                icon={<Shield size={16} />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function MenuItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-green-50 text-green-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={active ? "text-green-600" : "text-gray-400"}>
          {icon}
        </span>
        {label}
      </div>
      <ChevronRight
        size={16}
        className={`text-gray-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

function InfoField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {icon} {label}
      </label>
      <div className="rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900">
        {value}
      </div>
    </div>
  );
}
