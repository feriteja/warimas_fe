// Example Next.js 14+ App Router structure
// app/settings/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

const tabs = [
  { name: "Bio", slug: "" },
  { name: "Alamat", slug: "alamat" },
  { name: "Payment", slug: "payment" },
  { name: "Notif", slug: "notif" },
  { name: "Keamanan", slug: "keamanan" },
];

export default function SettingsLayout({
  children,
  tab,
}: {
  children: ReactNode;
  tab: ReactNode;
}) {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto p-6 gap-6">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-2xl shadow p-4 h-fit">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-gray-300" />
          <h2 className="text-xl font-semibold">User Name</h2>
          <p className="text-sm text-gray-500">user@mail.com</p>
        </div>
      </aside>

      {/* Tabs & Content */}
      <div className="flex-1">
        {/* Tabs */}
        <div className="flex gap-3 border-b pb-3 mb-4">
          {tabs.map((t) => (
            <Link
              key={t.slug}
              href={`/settings/${t.slug}`}
              className="px-4 py-2 rounded-xl hover:bg-gray-100"
            >
              {t.name}
            </Link>
          ))}
        </div>

        {/* Slot renders here */}
        <div>{tab}</div>
      </div>
    </div>
  );
}
