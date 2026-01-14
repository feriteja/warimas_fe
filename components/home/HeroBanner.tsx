import React from "react";

export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-500 h-64 w-full text-white pt-10 pb-20 px-6 text-center sm:text-left">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Belanja Kebutuhan Harian?
        </h1>
        <p className="text-emerald-50 text-lg opacity-90">
          Murah, Lengkap, dan Diantar sampai rumah.
        </p>
      </div>
    </div>
  );
}
