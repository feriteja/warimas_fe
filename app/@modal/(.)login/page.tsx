// d:\project\warimas\warimas_fe\app\@modal\(.)login\page.tsx

"use client";

import LoginPage from "@/app/(auth)/login/LoginForm";
import Modal from "@/components/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import LoginForm from "@/components/auth/LoginForm"; // Import your actual login form here

export default function LoginModal() {
  const router = useRouter();

  return (
    <Modal>
      <div className="p-6">
        {/* Replace this div with your <LoginForm /> */}
        <div className="space-y-4">
          <div className="rounded-md text-sm">
            <LoginPage
              onSuccess={() => {
                router.back();
                router.refresh();
              }}
            />
          </div>

          <div className="flex justify-center">
            <Link
              href="/login"
              className="text-emerald-600 hover:underline text-sm"
            >
              Go to full login page
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
