// admin/components/AdminNavbar.tsx
"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
  Settings,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import AdminProfile from "./AdminProfile";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: BadgeKey;
}

type BadgeKey = "pendingOrders";

const badges: Record<BadgeKey, number> = {
  pendingOrders: 12,
};

/* --------------------
 * NAV CONFIG
 * -------------------- */
const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badgeKey: "pendingOrders",
  },
  { label: "Sellers", href: "/admin/sellers", icon: Store },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminNavbar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card">
        <Sidebar pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r lg:hidden"
          >
            <Sidebar pathname={pathname} onClose={() => setOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>

            <Breadcrumbs />
          </div>

          <AdminProfile />
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

/* --------------------
 * SIDEBAR
 * -------------------- */
function Sidebar({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <span className="font-bold">Warimas Admin</span>
        {onClose && (
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.badgeKey && badges[item.badgeKey] > 0 && (
                <span className="ml-auto rounded-full bg-destructive px-2 py-0.5 text-xs text-white">
                  {badges[item.badgeKey]}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
