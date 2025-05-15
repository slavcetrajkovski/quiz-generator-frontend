"use client";

import { useEffect, useState } from "react";
import { Quiz } from "@/model";
import { useParams } from "next/navigation";
import QuizPlayer from "./_components/quiz-player";
import { Spinner } from "@/components/ui/spinner";
import { findQuizById } from "@/service/quiz-service";

export default function TakeQuizPage() {
  const params = useParams();
  const quizId = Number(params.quizId);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await findQuizById(quizId);
        setQuiz(quiz);
      } catch (err: any) {
        setError(err.message || "Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  if (!quiz || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    <p className="text-red-500 text-center font-medium">{error}</p>;
  }

  return <QuizPlayer quiz={quiz} />;
}
