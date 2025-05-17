"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/service/user-service";
import toast from "react-hot-toast";
import { logout } from "@/service/authentication-service";

export default function AuthProvider() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        logout();
        toast.error("Session has expired, please log in!");
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 30000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  return null;
}
