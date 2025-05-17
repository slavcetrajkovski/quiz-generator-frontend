import Sidebar from "@/components/sidebar";
import "./globals.css";
import ToastProvider from "@/components/providers/ToastProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import AuthChecker from "@/components/AuthChecker";

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
        <AuthChecker />
        <Sidebar />
        {children}
        </body>
        </html>
    );
}