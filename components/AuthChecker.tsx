"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkTokenExpiration, logout } from '@/service/authentication-service';

export default function AuthChecker() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            if (checkTokenExpiration()) {
                logout();
            }
        };

        //checkAuth();

        const interval = setInterval(checkAuth, 30000);

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token') checkAuth();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [router]);

    return null;
}