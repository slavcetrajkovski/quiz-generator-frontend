"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Quiz } from "@/model";
import QuizIntro from "./_components/quiz-intro";
import { AnimatePresence, motion } from "framer-motion";

const mockFetchQuizzes = async (): Promise<any[]> => {
  return [
    {
      id: 1,
      title: "Intro to AI",
      questions: [
        {
          id: 101,
          questionText: "What does AI stand for?",
          questionType: "MULTIPLE_CHOICE",
          answers: ["Automated Interface", "Artificial Intelligence", "Applied Innovation"],
          correctAnswer: "Artificial Intelligence",
        },
        {
          id: 102,
          questionText: "Which is an AI technique?",
          questionType: "MULTIPLE_CHOICE",
          answers: ["Sorting", "Machine Learning", "Compiling"],
          correctAnswer: "Machine Learning",
        },
      ],
    },
    {
      id: 2,
      title: "JavaScript Basics",
      questions: [
        {
          id: 201,
          questionText: "Which keyword declares a variable?",
          questionType: "MULTIPLE_CHOICE",
          answers: ["let", "for", "func"],
          correctAnswer: "let",
        },
        {
          id: 202,
          questionText: "What is `typeof null`?",
          questionType: "MULTIPLE_CHOICE",
          answers: ["object", "null", "undefined"],
          correctAnswer: "object",
        },
      ],
    },
    {
      id: 3,
      title: "HTML & CSS",
      questions: [
        {
          id: 301,
          questionText: "Which tag creates a hyperlink?",
          questionType: "MULTIPLE_CHOICE",
          answers: ["<a>", "<link>", "<href>"],
          correctAnswer: "<a>",
        },
        {
          id: 302,
          questionText: "Which property sets text color?",
          questionType: "MULTIPLE_CHOICE",
          answers: ["color", "font-color", "text-style"],
          correctAnswer: "color",
        },
      ],
    },
  ];
};

export default function TakeQuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    mockFetchQuizzes().then(setQuizzes);
  }, []);

  return (
    <main className="min-h-screen py-12 px-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="grid gap-8 max-w-4xl mx-auto">
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
    </main>
  );
}
