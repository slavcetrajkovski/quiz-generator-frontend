"use client";

import { useEffect, useState } from "react";
import { Quiz } from "@/model";
import { useParams } from "next/navigation";
import QuizPlayer from "./_components/quiz-player";

const mockFetchQuiz = async (quizId: number): Promise<any> => {
  return {
    id: quizId,
    title: "Sample Quiz on AI Basics",
    description: "Test your knowledge about Artificial Intelligence.",
    questions: [
      {
        id: 1,
        questionText: "What does AI stand for?",
        questionType: "MULTIPLE_CHOICE",
        answers: [
          "Artificial Insight",
          "Artificial Intelligence",
          "Auto Intellect",
        ],
        correctAnswer: "Artificial Intelligence",
      },
      {
        id: 2,
        questionText: "Which of these is a type of machine learning?",
        questionType: "MULTIPLE_CHOICE",
        answers: ["Supervised", "Inductive", "Correlative"],
        correctAnswer: "Supervised",
      },
    ],
  };
};

export default function TakeQuizPage() {
  const params = useParams();
  const quizId = Number(params.quizId);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    mockFetchQuiz(quizId).then(setQuiz);
  }, [quizId]);

  if (!quiz) return <p className="p-6">Loading quiz...</p>;

  return <QuizPlayer quiz={quiz} />;
}
