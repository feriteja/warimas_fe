"use client";
import { useCart } from "@/lib/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";

function CartNav() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="relative text-gray-700 hover:text-black text-sm font-medium"
    >
      <ShoppingCart className="font-bold" size={28} />
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

export default CartNav;
