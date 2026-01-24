import { Home, LayoutGrid, Tag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  // Routes where bottom navbar should NOT be shown
  const HIDDEN_NAVBAR_ROUTES = ["/product", "/checkout", "/login", "/invoice"];

  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (shouldHideNavbar) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-100 bg-white px-2 pb-safe md:hidden">
      <BottomTab icon={<Home size={20} />} label="Home" active href="/" />
      <BottomTab
        icon={<LayoutGrid size={20} />}
        label="Kategori"
        href="/category"
      />
      <BottomTab icon={<Tag size={20} />} label="Promo" href="/promo" />
      <BottomTab icon={<User size={20} />} label="Akun" href="/profile" />
    </div>
  );
}

function BottomTab({
  icon,
  label,
  active = false,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        active ? "text-green-600" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </Link>
  );
}
