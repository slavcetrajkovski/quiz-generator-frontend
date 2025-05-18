// /app/take/quiz/[quizId]/QuestionStep.tsx
import { Question } from "@/model";

export default function QuestionStep({
  question,
  userAnswer,
  onAnswerChange,
}: {
  question: Question;
  userAnswer: string | null;
  onAnswerChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4 mt-10">
      <p className="text-zinc-900 dark:text-white font-medium">
        {question.questionText}
      </p>

      {question.answers.map((answer, idx) => (
        <label
          key={idx}
          className={`block p-3 border rounded-lg cursor-pointer transition ${
            userAnswer === answer
              ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
              : "hover:border-blue-300"
          }`}
        >
          <input
            type="radio"
            value={answer}
            checked={userAnswer === answer}
            onChange={() => onAnswerChange(answer)}
            className="hidden"
          />
          {answer}
        </label>
      ))}
    </div>
  );
}
