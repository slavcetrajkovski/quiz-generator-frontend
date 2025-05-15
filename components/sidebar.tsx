"use client";

import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { isAuthenticated, logout } from "@/service/authentication-service";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const navRoutes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Quizzes", path: "/quiz/all" },
  { name: "Create Quiz", path: "/quiz/create" },
  { name: "Profile", path: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [pathname]);

  const handleProfileClick = (e: React.MouseEvent, path: string) => {
    if ((path === "/profile" || path === "/quiz/create") && !isLoggedIn) {
      e.preventDefault();
      toast.error("Please login first");
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Quizzy
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navRoutes.map((route) => (
                  <Link
                      key={route.path}
                      href={route.path}
                      onClick={(e) => handleProfileClick(e, route.path)}
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
              {isLoggedIn && (
                  <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600 transition">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>

                  <nav className="mt-8 space-y-4">
                    {navRoutes.map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            onClick={(e) => handleProfileClick(e, route.path)}
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
                    {isLoggedIn && (
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start px-4 py-2 text-lg text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-5 w-5" />
                          Logout
                        </Button>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
  );
}