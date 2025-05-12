import Sidebar from "@/components/sidebar";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

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
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
