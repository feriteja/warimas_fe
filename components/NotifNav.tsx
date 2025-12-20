"use client";
import { useNotif } from "@/lib/store/notif";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

function NotifNav() {
  const { items } = useNotif();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative text-gray-700 hover:text-black text-sm font-medium"
    >
      <Bell className="font-bold" size={28} />
      {totalItems > 0 && (
        <Badge asChild>
          <span className="absolute -top-2 -right-4 text-xs bg-red-500 text-white ">
            {totalItems}
          </span>
        </Badge>
      )}
    </Link>
  );
}

export default NotifNav;
