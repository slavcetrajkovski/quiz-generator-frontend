"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileJson, FileDown, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import Link from "next/link";

const QuizResultsPage = () => {
  const confetti = useConfettiStore();
  const router = useRouter();

  useEffect(() => {
    confetti.onOpen();
  }, []);

  const handleExportPDF = () => {
    alert("Exporting as PDF...");
  };

  const handleExportJSON = () => {
    alert("Exporting as JSON...");
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg text-center max-w-md w-full space-y-6"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
          🎉 Quiz Completed!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Great job! Choose how you'd like to export your results.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleExportPDF}
            variant="pink"
            className="flex items-center gap-2 justify-center"
          >
            <FileDown size={18} />
            Export as PDF
          </Button>
          <Button
            onClick={handleExportJSON}
            variant="secondary"
            className="flex items-center gap-2 justify-center"
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
