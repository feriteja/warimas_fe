// app/login/page.tsx
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | Warimas",
};

export default async function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] flex items-center justify-center md:px-4 md:py-10">
      <LoginForm />
    </main>
  );
}
