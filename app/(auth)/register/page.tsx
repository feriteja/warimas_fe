import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Daftar | Warimas",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}
