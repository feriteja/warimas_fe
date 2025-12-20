"use client";
import { useMail } from "@/lib/store/mail";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

function MailNav() {
  const { items } = useMail();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/mail"
      className="relative text-gray-700 hover:text-black text-sm font-medium"
    >
      <Mail className="font-bold" size={28} />
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

export default MailNav;
