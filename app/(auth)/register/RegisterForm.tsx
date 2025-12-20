"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleButonRegister } from "@/components/GoogleButon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----------------------------
// ZOD Validation
// ----------------------------
const RegisterSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Minimal 8 karakter")
    .regex(/[A-Z]/, "Harus ada huruf kapital")
    .regex(/[0-9]/, "Harus ada angka"),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

// ----------------------------
// GRAPHQL MUTATION
// ----------------------------
async function registerUser({ email, password }: RegisterForm) {
  const query = `
    mutation Register($email: String!, $password: String!) {
      register(input: { email: $email, password: $password }) {
        token
        user { id role }
      }
    }
  `;

  const body = JSON.stringify({
    query,
    variables: { email, password },
  });

  const res = await fetch("http://localhost:8080/query", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  // Network-level error
  if (!res.ok) {
    throw new Error("Gagal terhubung ke server");
  }

  const json = await res.json();

  // GraphQL-level error
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Terjadi kesalahan server");
  }

  return json.data.register;
}

// ----------------------------
// Page Component
// ----------------------------
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterForm) => {
    if (loading || !isValid) return;

    setLoading(true);
    setFormError(null);

    try {
      const result = await registerUser(data);

      // Store token if needed
      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      router.push("/");
    } catch (err: any) {
      setFormError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center md:p-4">
      <div className="w-screen flex flex-col min-h-screen md:min-h-fit md:max-w-md bg-white rounded-2xl shadow-md p-3 md:p-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Daftar ke warimas</h1>

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
              placeholder="Password minimal 8 karakter"
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
            disabled={!isValid || loading}
            className="w-full h-12 text-base font-semibold rounded-xl bg-[#6ab880] hover:bg-[#82cb97] disabled:bg-gray-300"
          >
            {loading ? "Memproses..." : "Register"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-500">
            Daftar lebih cepat dengan
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <GoogleButonRegister />
        </div>

        {/* Login link */}
        <div className="text-center mt-6 text-sm">
          Udah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Masuk aja!
          </Link>
        </div>

        {/* Footer */}
        <footer className="absolute md:static bottom-2 left-2 right-2 text-center mt-10">
          <p className="text-[11px] text-gray-500">
            Dengan daftar, kamu menyetujui Kebijakan Privasi dan Syarat &
            Ketentuan Warimas.
          </p>
          <p className="text-gray-400 text-xs mt-4 font-medium">
            warimas — All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
