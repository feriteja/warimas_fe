import { getProfile } from "@/services/user.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditProfileForm from "./edit-profile-form";

export default async function EditProfilePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  let user;

  try {
    user = await getProfile({ cookieHeader });
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-lg py-10 px-4">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <EditProfileForm user={user} />
      </div>
    </div>
  );
}
