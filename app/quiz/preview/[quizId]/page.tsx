"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { findQuizById } from "@/service/quiz-service";
import QuizQuestions from "../../create/_components/quiz-question-generator";
import { Quiz } from "@/model";
import { Spinner } from "@/components/ui/spinner";

const QuizIdPage = () => {
  const { quizId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const result = await findQuizById(Number(quizId));
        setQuiz(result);
      } catch {
        router.push("/");
      }
    };

    loadQuiz();
  }, [quizId]);

  if (!quiz)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h1>
      <QuizQuestions quizId={quiz.id} />
    </div>
  );
};

export default QuizIdPage;
