// components/sidebar.tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const navRoutes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Quizzes", path: "/quizes" },
  { name: "Create Quiz", path: "/quiz/create" },
  { name: "Profile", path: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Quizzy
        </Link>

        {/* Mobile Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600 transition">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>

              <nav className="mt-8 space-y-4">
                {navRoutes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "block px-4 py-2 rounded-md text-lg hover:bg-blue-100 transition",
                      pathname === route.path
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <nav className="hidden md:flex space-x-8">
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-lg hover:text-blue-600 transition-colors",
                pathname === route.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
