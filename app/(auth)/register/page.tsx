// app/(auth)/register/page.tsx
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Daftar | Warimas",
  description: "Buat akun baru untuk mulai berbelanja di Warimas",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] flex items-center justify-center md:px-4 md:py-10">
      <RegisterForm />
    </main>
  );
}
