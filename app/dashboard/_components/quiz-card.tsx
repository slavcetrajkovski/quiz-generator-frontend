import { Quiz } from "../_services/quiz-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-sm">
                        {quiz.questionCount} questions
                    </Badge>
                    <span className="text-sm text-muted-foreground">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/quiz/${quiz.id}`}>View</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/quiz/${quiz.id}/export/json`}>Export</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}