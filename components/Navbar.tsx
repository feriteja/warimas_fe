"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";

import CartNav from "./CartNav";
import MailNav from "./MailNav";
import NotifNav from "./NotifNav";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow-sm">
      <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-10">
        {/* Left: Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10 md:h-12 md:w-12">
            <Image
              src="/logo/logonobgnoword.png"
              alt="warimas logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="hidden md:block text-2xl font-bold text-[#6ab880]">
            warimas
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-8">
          <div className="flex w-full items-center rounded-xl border border-black/20 bg-gray-50 px-4 py-2 focus-within:ring-1 focus-within:ring-green-500">
            <Search className="mr-2" />
            <input
              type="text"
              placeholder="Belanja apa ya?"
              className="w-full bg-transparent font-semibold outline-none"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Mobile Search Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileSearchOpen((v) => !v)}
          >
            <Search />
          </button>

          <CartNav />
          <NotifNav />
          <MailNav />

          {/* Desktop Login */}
          <button className="hidden md:block rounded-md bg-green-500 px-4 py-1 text-white">
            Login
          </button>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center rounded-xl border border-black/20 bg-gray-50 px-4 py-2">
            <Search className="mr-2" />
            <input
              type="text"
              placeholder="Belanja apa ya?"
              className="w-full bg-transparent font-semibold outline-none"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-4">
          <Link
            href="/category "
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold"
          >
            Kategori
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
