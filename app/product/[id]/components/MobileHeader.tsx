import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";

interface MobileHeaderProps {
  productName: string;
}

export function MobileHeader({ productName }: MobileHeaderProps) {
  return (
    <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center justify-between px-4 h-14">
        <Link
          href="/"
          className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </Link>
        <h1 className="font-semibold text-slate-900 truncate max-w-[200px] text-sm">
          {productName}
        </h1>
        <div className="flex gap-2">
          <button className="p-2 -mr-2 hover:bg-slate-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
