import { getProfile } from "@/services/user.service";
import { cookies } from "next/headers";
import Modal from "@/components/ui/modal";
import EditProfileForm from "../../edit/edit-profile-form";

export default async function InterceptedEditProfilePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  let user;

  try {
    user = await getProfile({ cookieHeader });
  } catch (error) {
    return null;
  }

  return (
    <Modal>
      <EditProfileForm user={user} />
    </Modal>
  );
}
