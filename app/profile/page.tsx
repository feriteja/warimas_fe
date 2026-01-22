import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfile } from "@/services/user.service";
import ProfileView from "./profile-view";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let user;
  try {
    // Fetch profile on the server, passing cookies for authentication
    user = await getProfile({ cookieHeader });
  } catch (error) {
    console.error("Failed to fetch profile on server", error);
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
