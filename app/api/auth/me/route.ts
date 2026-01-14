import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Optional: You could also verify the token with your backend here
  // and return user data (name, avatar, etc.)
  return NextResponse.json({ authenticated: true });
}
