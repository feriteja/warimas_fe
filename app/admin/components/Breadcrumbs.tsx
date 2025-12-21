"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={href} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
            <Link href={href} className="hover:text-foreground transition">
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
