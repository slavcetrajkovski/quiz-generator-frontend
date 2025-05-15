import ActionCard from "./action-card";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function WelcomeSection({ name }: { name?: string }) {
    const router = useRouter();

    const handleAuthAction = (href: string) => {
        return (e: React.MouseEvent) => {
            if (!name) {
                e.preventDefault();
                toast.error("Please login first");
                router.push("/login");
            }
        };
    };

    return (
        <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome, {name || "Guest"}!
            </h1>
            <p className="text-lg text-muted-foreground">
                {name ? "Ready to create or review your quizzes?" : "Login to access all features"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ActionCard
                    title="Create New Quiz"
                    description={name ? "Start building a new quiz" : "Login to create quizzes"}
                    href="/quiz/create"
                    icon="➕"
                    className="bg-blue-50 border-blue-100 hover:border-blue-300"
                    onClick={handleAuthAction("/quiz/create")}
                />
                <ActionCard
                    title="View My Quizzes"
                    description={name ? "See your created quizzes" : "Login to view your quizzes"}
                    href="/quiz/all"
                    icon="📝"
                    className="bg-purple-50 border-purple-100 hover:border-purple-300"
                    onClick={handleAuthAction("/quiz/all")}
                />
            </div>
        </div>
    );
}