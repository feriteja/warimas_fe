import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getPaymentOrderInfo } from "@/services/order.service";
import Link from "next/link";
import { PaymentDetails } from "./PaymentDetails";
import { PaymentInstructions } from "./PaymentInstructions";
import { OrderSummary } from "./OrderSummary";

export const metadata: Metadata = { title: "Secure Payment | View Order" };

export default async function CheckoutPaymentPage({
  params,
}: {
  params: Promise<{ payid: string }>;
}) {
  const { payid } = await params;
  if (!payid) redirect("/");

  const cookieStore = await cookies();
  const data = await getPaymentOrderInfo({
    externalId: payid,
    cookieHeader: cookieStore.toString(),
  }).catch((error) => {
    console.error("Error fetching payment info:", error);
    if (
      error instanceof Error &&
      (error.message.includes("element is null") ||
        error.message.includes("not found"))
    ) {
      notFound();
    }
    throw error;
  });

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-8 antialiased">
      <div className="mx-auto max-w-[1000px] px-6">
        {/* Top Navigation / Breadcrumb */}
        <nav className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-800">
              Store
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900">Payment</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            SECURE ENCRYPTED
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <PaymentDetails
              payment={data.payment}
              status={data.status}
              payid={payid}
            />
            <PaymentInstructions instructions={data.payment?.instructions} />
          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <OrderSummary data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
