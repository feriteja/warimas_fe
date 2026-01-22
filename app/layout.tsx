import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Warimas",
  description: "Warungnya Orang Rumah",
};

export default function RootLayout({
  children,
  modal, // Add this prop
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; // Add this type
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Providers>
          <Navbar />
          {children}
          {modal} {/* Render the modal slot */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
