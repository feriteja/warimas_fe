// admin/layout.tsx (SERVER COMPONENT)
import { cookies } from "next/headers";
import { getAuthPayload, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavbar from "./components/AdminNavbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("access_token")?.value;
  const user = await getAuthPayload(token);

  if (!isAdmin(user)) {
    redirect("/403");
  }

  return <AdminNavbar>{children}</AdminNavbar>;
}
