"use client";
import { useState } from "react";

export default function ShippingStatus({ timeline }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-semibold text-lg"
      >
        <span>Status Pengiriman</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-4 relative border-l-2 border-green-500 ml-2 pl-4 flex flex-col gap-6">
          {timeline.map((step: any, idx: any) => (
            <div key={idx}>
              <div className="font-semibold text-green-700">{step.title}</div>
              <div className="text-sm text-gray-500">{step.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
