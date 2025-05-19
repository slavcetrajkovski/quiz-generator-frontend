"use client";

import { Quiz } from "@/model";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import QuestionStep from "./question-step";
import ProgressBar from "./progress-bar";
import { useRouter } from "next/navigation";
import { submitQuizResults } from "@/service/quiz-results-service";
import { Spinner } from "@/components/ui/spinner";

interface QuizPlayerProps {
  quiz: Quiz;
}

export default function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizFinished, setQuizFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          setQuizFinished(true);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (value: string) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSubmit = async () => {
    if (!startTime) return;

    const userAnswers: Record<number, string> = {};
    quiz.questions.forEach((q, i) => {
      if (answers[i]) {
        userAnswers[q.id] = answers[i]!;
      }
    });

    const timeTaken = Date.now() - startTime;

    try {
      const result = await submitQuizResults(quiz.id, userAnswers, timeTaken);
      setLoading(true);
      router.push(`/quiz/results/${result.id}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const q = quiz.questions[current];

  if (loading) {
    return <Spinner />;
  }

  if (quizFinished) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white text-center">
          Time's up! Your quiz is now finished.
        </h2>
        <div className="flex justify-center mt-6">
          <Link href={`/quiz/results/${quiz.id}`}>
            <Button variant="pink">See Results</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          Question {current + 1} of {quiz.questions.length}
        </h2>

        <div className="text-lg font-semibold text-zinc-800 dark:text-white">
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      <ProgressBar total={quiz.questions.length} current={current} />

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionStep
            question={q}
            userAnswer={answers[current]}
            onAnswerChange={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end mt-6">
        {current === quiz.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            variant="pink"
            disabled={!answers[current]}
          >
            Finish Quiz
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="pink"
            disabled={!answers[current]}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
