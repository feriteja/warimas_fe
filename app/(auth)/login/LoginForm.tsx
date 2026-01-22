"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth.service";
import { GoogleButonRegister } from "@/components/GoogleButon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----------------------------
// ZOD Validation
// ----------------------------
const LoginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

// ----------------------------
// Page Component
// ----------------------------
interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginPage({ onSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (loading) return;

    setLoading(true);
    setFormError(null);

    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });

      // Store token if needed
      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    } catch (err: any) {
      if (err.message === "invalid credentials") {
        setFormError("Email atau password salah");
      } else {
        setFormError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Masuk ke warimas</h1>

        {/* Error Message (top-level) */}
        {formError && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md text-sm mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <Input
              {...register("email")}
              placeholder="Email"
              className="h-12 text-base rounded-xl border-gray-300 focus:ring-2 focus:ring-[#6ab880]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="h-12 text-base rounded-xl border-gray-300 focus:ring-2 focus:ring-[#6ab880]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold rounded-xl bg-[#6ab880] hover:bg-[#82cb97] disabled:bg-gray-300"
          >
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-500">
            Masuk lebih cepat dengan
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <GoogleButonRegister text="Masuk dengan Google" />
        </div>

        {/* Login link */}
        <div className="text-center mt-6 text-sm">
          <Link
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Belum punya akun?
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10">
          <p className="text-[11px] text-gray-500">
            Dengan memakai layanan kami, kamu menyetujui Kebijakan Privasi dan
            Syarat & Ketentuan Warimas.
          </p>
          <p className="text-gray-400 text-xs mt-4 font-medium">
            warimas — All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
