"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../service/user-service";
import { useRouter } from "next/navigation";
import WelcomeSection from "./_components/welcome-section";
import RecentQuizzes from "./_components/recent-quizzes";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardQuiz, User, UserQuizResults } from "@/model";
import { fetchRecentQuizzes } from "@/service/quiz-service";
import QuizResults from "./_components/quiz-results";
import { getResutlsForUserQuizzes } from "@/service/quiz-results-service";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<DashboardQuiz[]>([]);
  const [results, setResults] = useState<UserQuizResults[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userData = await getCurrentUser();
        setUser(userData);
        setAuthChecked(true);

        if (userData) {
          const [quizzesData, resultsData] = await Promise.all([
            fetchRecentQuizzes(),
            getResutlsForUserQuizzes(),
          ]);
          setQuizzes(quizzesData.slice(0, 3));
          setResults(resultsData);
        }
      } catch (error: any) {
        setError("Please login to access your dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (!authChecked && loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (!user && authChecked) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to Quizzy!
        </h1>
        <p className="text-lg mb-6">Please login to access your dashboard</p>
        <Button asChild>
          <Link href="/login">Login Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-5 mx-auto px-4 py-8">
      <WelcomeSection name={user?.name} />
      <RecentQuizzes
        quizzes={quizzes}
        loading={loading && authChecked}
        error={error}
      />
      <QuizResults
        results={results}
        loading={loading && authChecked}
        error={error}
      />
    </div>
  );
}
