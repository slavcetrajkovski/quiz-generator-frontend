import { Quiz } from "@/model";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function QuizIntro({
  quiz,
  onStart,
}: {
  quiz: Quiz;
  onStart: () => void;
}) {
  return (
    <div className="relative max-w-xl mx-auto mt-16 p-6 rounded-2xl bg-white shadow-lg text-center space-y-6">
      <Link
        href={`/quiz/preview/${quiz.id}`}
        className="absolute top-4 right-4 text-zinc-500 hover:text-pink-500 transition-colors"
      >
        <Pencil size={20} />
      </Link>

      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
        {quiz.title}
      </h1>
      <Button onClick={onStart} variant="pink">
        Start Quiz
      </Button>
    </div>
  );
}
