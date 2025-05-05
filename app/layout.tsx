import Sidebar from "@/components/sidebar";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
