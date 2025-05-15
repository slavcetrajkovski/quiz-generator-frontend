"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileJson, FileDown, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import Link from "next/link";
import { UserQuizResults } from "@/model";
import {
  exportQuizAsJson,
  exportQuizAsPdf,
  getResultById,
} from "@/service/quiz-results-service";
import { Spinner } from "@/components/ui/spinner";

const QuizResultsPage = () => {
  const params = useParams();
  const resultId = Number(params.resultId);
  const confetti = useConfettiStore();
  const [result, setResult] = useState<UserQuizResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    confetti.onOpen();
  }, []);

  useEffect(() => {
    confetti.onOpen();

    const fetchResult = async () => {
      try {
        const res = await getResultById(resultId);
        setResult(res);
      } catch (err: any) {
        setError(err.message || "Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  const handleDownload = async (type: "json" | "pdf") => {
    if (!result) {
      alert("Result data is not available.");
      return;
    }
    try {
      const blob =
        type === "json"
          ? await exportQuizAsJson(result.quiz.id)
          : await exportQuizAsPdf(result.quiz.id);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `quiz_${result.quiz.id}.${type}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <Spinner />
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-center font-medium">{error}</p>
      </main>
    );
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl text-center max-w-2xl w-full space-y-6"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
          🎉 Quiz Completed!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          You finished <strong>{result.quiz.title}</strong>
        </p>

        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl py-6 px-4 text-white shadow-inner">
          <p className="text-xl font-semibold">Score</p>
          <h2 className="text-5xl font-bold">
            {result.scorePercentage.toFixed(1)}%
          </h2>
          <p className="mt-2 text-sm">
            Time taken: {formatTime(result.timeTakenMillis)}
          </p>
        </div>

        <div className="text-left space-y-2">
          <h3 className="text-lg font-medium text-zinc-800 dark:text-white">
            Feedback:
          </h3>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            {result.feedback.map((msg, idx) => (
              <li
                key={idx}
                className={`pl-2 border-l-4 ${
                  msg.includes("Incorrect")
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              >
                {msg}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={() => handleDownload("pdf")}
            variant="pink"
            className="flex items-center gap-2 justify-center"
          >
            <FileDown size={18} />
            Export as PDF
          </Button>
          <Button
            onClick={() => handleDownload("json")}
            variant="secondary"
            className="flex items-center gap-2 justify-center cursor-pointer"
          >
            <FileJson size={18} />
            Export as JSON
          </Button>
          <Link
            href="/quiz/all"
            className="flex items-center gap-2 justify-center text-zinc-500 hover:text-zinc-700"
          >
            <Button variant="ghost" className="w-full">
              <XCircle size={18} />
              Cancel
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default QuizResultsPage;
