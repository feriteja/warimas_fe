import Link from "next/link";
import CartNav from "./CartNav";
import Image from "next/image";
import { Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full relative top-0 h-16 md:h-20 space-x-2 md:space-x-4 bg-white py-3  px-3 md:px-10 shadow-xs z-10 flex items-center justify-between">
      {/* Logo Section */}
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative h-10 w-10 sm:h-12 sm:w-12">
          <Image
            src={"/logo/logonobgnoword.png"}
            alt="warimas logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xl hidden md:block sm:text-2xl font-bold text-[#6ab880]">
          warimas
        </span>
      </Link>

      <span className="font-semibold md:ml-4">Kategori</span>

      {/* Search Bar */}
      <div className="flex transition-all py-1 bg-white md:flex-1 group focus-within:absolute focus-within:left-0 focus-within:right-0  px-4  border border-black/20 rounded-xl items-center z-10  focus-within:ring-1 focus-within:ring-green-500 focus-within:border-green-500">
        <label htmlFor="search">
          <Search />
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Belanja apa ya ?"
          className=" w-full   focus:w-full md:block  px-4 py-2 text-md font-semibold focus:outline-none  "
        />
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-2 md:space-x-6">
        {/* Cart */}
        <CartNav />

        {/* Auth Buttons (Placeholder) */}
        <button className="text-md rounded-md text-white  px-4 py-1 bg-green-500 cursor-pointer hidden md:block">
          Login
        </button>
        <div className="border-2 rounded-full p-1 md:hidden">
          <User />
        </div>
      </div>
    </nav>
  );
}
