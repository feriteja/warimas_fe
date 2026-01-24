"use client";

import { Printer } from "lucide-react";

export default function InvoiceActions() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium backdrop-blur-sm"
    >
      <Printer className="w-4 h-4" />
      Print / Save PDF
    </button>
  );
}
