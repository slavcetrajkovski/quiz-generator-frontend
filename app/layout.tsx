import Sidebar from "@/components/sidebar";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import AuthProvider from "@/components/providers/auth-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfettiProvider />
        <ToastProvider />
        <AuthProvider />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
