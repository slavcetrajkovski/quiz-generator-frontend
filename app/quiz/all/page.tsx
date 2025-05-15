"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Quiz } from "@/model";
import QuizIntro from "./_components/quiz-intro";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { getAllQuizzesByUser } from "@/service/quiz-service";

export default function TakeQuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getAllQuizzesByUser();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <main className="min-h-screen py-12 px-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center font-medium">{error}</p>
        ) : (
          <div className="grid gap-8">
            <AnimatePresence>
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <QuizIntro
                    quiz={quiz}
                    onStart={() => router.push(`/quiz/take/${quiz.id}`)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
