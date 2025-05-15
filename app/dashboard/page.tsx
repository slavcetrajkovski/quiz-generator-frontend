"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, UserDTO } from "../profile/_services/user-service";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { fetchRecentQuizzes } from "./_services/quiz-service";
import WelcomeSection from "./_components/welcome-section";
import RecentQuizzes from "./_components/recent-quizzes";

export default function DashboardPage() {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [authChecked, setAuthChecked] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
                setAuthChecked(true);

                if (userData) {
                    const quizzesData = await fetchRecentQuizzes();
                    setQuizzes(quizzesData);
                }
            } catch (error) {
                toast.error("Please login to access dashboard");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center">
                <div className="animate-pulse flex flex-col space-y-4 w-full max-w-4xl">
                    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-48 bg-gray-200 rounded-lg"></div>
                        <div className="h-48 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (!user && authChecked) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Quizzy!</h1>
                <p className="text-lg mb-6">Please login to access your dashboard</p>

            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <WelcomeSection name={user?.name} />
            <RecentQuizzes quizzes={quizzes} />
        </div>
    );
}

interface Quiz {
    id: number;
    title: string;
    createdAt: string;
    questionCount: number;
}