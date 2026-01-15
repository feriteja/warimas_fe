"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  Menu,
  X,
  Bell,
  ShoppingCart,
  Mail,
  ChevronDown,
  Home,
  LayoutGrid,
  Tag,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Package, Settings, User as UserIcon } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll effect for professional "floating" feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auth Check
  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!cancelled) setIsLoggedIn(res.ok);
      } catch {
        if (!cancelled) setIsLoggedIn(false);
      } finally {
        if (!cancelled) setAuthChecked(true);
      }
    }
    checkAuth();
    return () => {
      cancelled = true;
    };
  }, []);

  const goToCart = () => {
    try {
      router.push("/cart");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`relative flex h-16 items-center justify-between px-4 transition-all duration-300 
            ${
              scrolled
                ? "rounded-2xl bg-white/90 shadow-lg backdrop-blur-md border border-gray-200/50"
                : "bg-white rounded-2xl border border-transparent"
            }`}
          >
            {/* 1. LOGO SECTION */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/logo/logonobgnoword.png"
                    alt="warimas logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="hidden text-2xl font-extrabold tracking-tight text-slate-900 sm:block">
                  wari<span className="text-green-600">mas</span>
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
                <Link
                  href="/category"
                  className="hover:text-green-600 transition-colors"
                >
                  Kategori
                </Link>
                <Link
                  href="/promo"
                  className="hover:text-green-600 transition-colors"
                >
                  Promo
                </Link>
              </div>
            </div>

            {/* 2. SEARCH BAR (Hidden on very small screens) */}
            <div className="hidden flex-1 px-8 md:flex justify-center max-w-xl">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search
                    size={18}
                    className="text-gray-400 group-focus-within:text-green-500 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cari sayur, buah, atau bumbu..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 outline-none"
                />
              </div>
            </div>

            {/* 3. ACTION SECTION (Cart, Notif, Profile) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Icons always visible on all screens */}
              <div className="flex items-center gap-0.5 sm:gap-1 sm:border-r sm:border-gray-200 sm:pr-2 sm:mr-2">
                <NavIcon
                  icon={<ShoppingCart size={22} />}
                  count={3}
                  onClick={() => goToCart()}
                  label="Keranjang"
                />
                {/* <NavIcon
                  icon={<Bell size={22} />}
                  count={5}
                  label="Notifikasi"
                />
                <div className="hidden sm:block">
                  <NavIcon icon={<Mail size={22} />} label="Pesan" />
                </div> */}
              </div>

              {/* Desktop Auth Area */}
              <div className="hidden md:flex items-center">
                {!authChecked ? (
                  <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-100" />
                ) : isLoggedIn ? (
                  <div className="relative" ref={dropdownRef}>
                    {/* The Trigger Button */}
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className={`flex items-center gap-2 rounded-xl border p-1 pr-3 transition-all shadow-sm
        ${
          userMenuOpen
            ? "border-green-500 bg-green-50 ring-4 ring-green-500/10"
            : "border-gray-200 hover:bg-gray-50"
        }`}
                    >
                      <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold shadow-inner">
                        <UserIcon size={18} />
                      </div>
                      <div className="hidden text-left lg:block">
                        <span className="text-sm font-bold text-gray-700">
                          John Doe
                        </span>{" "}
                        {/* Replace with dynamic name */}
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-gray-400 transition-transform duration-200 ${
                          userMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* The Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-100 z-[60]">
                        <div className="px-3 py-2 border-b border-gray-50 mb-1">
                          <p className="text-xs font-medium text-gray-400">
                            Akun Terdaftar
                          </p>
                          <p className="text-sm font-bold text-gray-800 truncate">
                            johndoe@email.com
                          </p>
                        </div>

                        <div className="space-y-1">
                          <DropdownItem
                            icon={<UserIcon size={18} />}
                            label="Profil Saya"
                            href="/profile"
                          />
                          <DropdownItem
                            icon={<Package size={18} />}
                            label="Pesanan Saya"
                            href="/orders"
                          />
                          <DropdownItem
                            icon={<Settings size={18} />}
                            label="Pengaturan"
                            href="/settings"
                          />
                        </div>

                        <div className="mt-2 pt-2 border-t border-gray-50">
                          <button
                            onClick={() => {
                              /* add logout logic here */
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={18} />
                            Keluar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-green-700 transition-all active:scale-95"
                  >
                    Masuk
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="ml-1 p-2 text-gray-600 md:hidden hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* 4. MOBILE DRAWER */}
          {mobileMenuOpen && (
            <div className="absolute left-4 right-4 top-20 z-50 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="space-y-5">
                {/* User Status Section */}
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        placeholder="Cari kebutuhan dapur..."
                        className="w-full rounded-xl border border-gray-200 p-3 pl-10 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>
                    {/* Mobile Profile Card */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 border border-green-100">
                      <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-sm">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-600 uppercase tracking-tight">
                          Selamat Datang,
                        </p>
                        <p className="text-base font-extrabold text-gray-800">
                          John Doe
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      <Link
                        href="/orders"
                        className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-4 hover:bg-gray-100 transition-colors border border-transparent active:border-green-200"
                      >
                        <Package className="text-green-600 mb-1" size={24} />
                        <span className="text-xs font-bold text-gray-700">
                          Pesanan
                        </span>
                      </Link>
                      {/* <Link
                        href="/messages"
                        className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-4 hover:bg-gray-100 transition-colors border border-transparent active:border-green-200"
                      >
                        <Mail className="text-green-600 mb-1" size={24} />
                        <span className="text-xs font-bold text-gray-700">
                          Pesan
                        </span>
                      </Link> */}
                    </div>
                  </div>
                ) : (
                  /* Search only shows here if not logged in, or keep it for both */
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      placeholder="Cari kebutuhan dapur..."
                      className="w-full rounded-xl border border-gray-200 p-3 pl-10 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>
                )}

                {/* Main Navigation Links */}
                <nav className="space-y-1">
                  <p className="px-2 text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">
                    Menu Utama
                  </p>
                  <Link
                    href="/category"
                    className="flex items-center justify-between py-3 px-3 font-semibold text-gray-700 hover:bg-gray-50 rounded-xl"
                  >
                    Kategori{" "}
                    <ChevronDown
                      size={16}
                      className="-rotate-90 text-gray-300"
                    />
                  </Link>
                  <Link
                    href="/promo"
                    className="flex items-center justify-between py-3 px-3 font-semibold text-gray-700 hover:bg-gray-50 rounded-xl"
                  >
                    Promo Hari Ini{" "}
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                      New
                    </span>
                  </Link>

                  {isLoggedIn && (
                    <>
                      <Link
                        href="/settings"
                        className="flex items-center justify-between py-3 px-3 font-semibold text-gray-700 hover:bg-gray-50 rounded-xl"
                      >
                        Pengaturan Akun{" "}
                        <Settings size={18} className="text-gray-400" />
                      </Link>
                      <button
                        onClick={() => {
                          /* logout logic */
                        }}
                        className="flex w-full items-center justify-between py-3 px-3 font-semibold text-red-600 hover:bg-red-50 rounded-xl mt-2"
                      >
                        Keluar <LogOut size={18} />
                      </button>
                    </>
                  )}
                </nav>

                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="block rounded-xl bg-green-600 py-4 text-center font-bold text-white shadow-lg shadow-green-100 active:scale-[0.98] transition-transform"
                  >
                    Masuk atau Daftar
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* 5. MOBILE BOTTOM NAVIGATION (Optional - great for UX) */}
      <BottomNavbar />
    </>
  );
}

// --- SUB-COMPONENTS ---

function NavIcon({
  icon,
  count,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  count?: number;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onClick?.()}
      title={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-all hover:bg-green-50 hover:text-green-600 active:scale-90"
    >
      {icon}
      {typeof count === "number" && (
        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  );
}

function BottomTab({
  icon,
  label,
  active = false,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        active ? "text-green-600" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </Link>
  );
}

function DropdownItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
    >
      <span className="text-gray-400 group-hover:text-green-600">{icon}</span>
      {label}
    </Link>
  );
}

function BottomNavbar() {
  const pathname = usePathname();

  // Routes where bottom navbar should NOT be shown
  const HIDDEN_NAVBAR_ROUTES = ["/product", "/checkout", "/login"];

  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHideNavbar) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-100 bg-white px-2 pb-safe md:hidden">
      <BottomTab icon={<Home size={20} />} label="Home" active href="/" />
      <BottomTab
        icon={<LayoutGrid size={20} />}
        label="Kategori"
        href="/category"
      />
      <BottomTab icon={<Tag size={20} />} label="Promo" href="/promo" />
      <BottomTab icon={<User size={20} />} label="Akun" href="/profile" />
    </div>
  );
}
