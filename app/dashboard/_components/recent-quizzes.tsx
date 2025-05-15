import { Quiz } from "../_services/quiz-service";
import QuizCard from "./quiz-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RecentQuizzes({ quizzes }: { quizzes: Quiz[] }) {
    const router = useRouter();

    const handleAuthAction = (href: string) => {
        return (e: React.MouseEvent) => {
            if (quizzes.length === 0) {
                e.preventDefault();
                toast.error("Please login first");
                router.push("/login");
            }
        };
    };

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
                        {quizzes.length === 0 ? "Please login to see your quizzes" : "You haven't created any quizzes yet"}
                    </p>
                    <Button asChild>
                        <Link
                            href="/quiz/create"
                            onClick={handleAuthAction("/quiz/create")}
                        >
                            {quizzes.length === 0 ? "Login Now" : "Create Your First Quiz"}
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