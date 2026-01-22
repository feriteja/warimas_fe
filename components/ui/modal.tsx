// components/ui/modal.tsx
"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = () => {
    router.back();
  };

  const onClick = (e: React.MouseEvent) => {
    if (e.target === overlay.current || e.target === wrapper.current) {
      if (onDismiss) onDismiss();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onDismiss();
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
