import { findQuizById } from "@/service/quiz-service";
import { redirect } from "next/navigation";
import QuizQuestions from "../create/_components/quiz-question-generator";

const QuizIdPage = async ({ params }: { params: { quizId: string } }) => {
  const quizId = Number(params.quizId);
  const quiz = await findQuizById(quizId);

  if (!quiz) {
    return redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
      <QuizQuestions
        quizId={quiz.id}
        filePath={quiz.document.filePath}
      />
    </div>
  );
};

export default QuizIdPage;
