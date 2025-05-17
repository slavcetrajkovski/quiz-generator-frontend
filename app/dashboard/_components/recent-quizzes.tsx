import { DashboardQuiz } from "../_services/quiz-service";
import QuizCard from "./quiz-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function RecentQuizzes({
                                          quizzes,
                                          loading,
                                          error
                                      }: {
    quizzes: DashboardQuiz[];
    loading: boolean;
    error: string | null;
}) {

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner />
            </div>
        );
    }
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-8">
                За креирање и преглед на квизови мора да се најавите!
            </div>
        );
    }

    return (
        <>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Recent Quizzes</h2>
                {quizzes.length > 0 && (
                    <Button variant="outline" asChild>
                        <Link href="/quiz/all">View All</Link>
                    </Button>
                )}
            </div>

            {quizzes.length === 0 ? (
                <div className="bg-card rounded-lg border p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                        You haven't created any quizzes yet
                    </p>
                    <Button asChild>
                        <Link href="/quiz/create">
                            Create Your First Quiz
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                </div>
            )}
        </>
    );
}