"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerService } from "@/services/auth.service";
import { GoogleButonRegister } from "@/components/GoogleButon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/services/user.service";

const RegisterSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (loading) return;

    setLoading(true);
    setFormError(null);

    try {
      const result = await registerService({
        // name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      await getProfile();
      await updateProfile({
        fullName: data.name,
      });

      router.push("/");
    } catch (err: any) {
      if (err.message.includes("already exists")) {
        setFormError("Email sudah terdaftar");
      } else {
        setFormError("Terjadi kesalahan saat mendaftar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-semibold mb-6">Daftar ke warimas</h1>

        {formError && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md text-sm mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              {...register("name")}
              placeholder="Nama Lengkap"
              className="h-12 text-base rounded-xl border-gray-300 focus:ring-2 focus:ring-[#6ab880]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold rounded-xl bg-[#6ab880] hover:bg-[#82cb97] disabled:bg-gray-300"
          >
            {loading ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-500">
            Daftar lebih cepat dengan
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex justify-center gap-4">
          <GoogleButonRegister text="Daftar dengan Google" />
        </div>

        <div className="text-center mt-6 text-sm">
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sudah punya akun? Masuk
          </Link>
        </div>

        <footer className="text-center mt-10">
          <p className="text-[11px] text-gray-500">
            Dengan mendaftar, kamu menyetujui Kebijakan Privasi dan Syarat &
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
