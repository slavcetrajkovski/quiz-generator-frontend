"use client";

import { UserQuizResults } from "@/model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QuizResultCardProps {
  result: UserQuizResults;
}

export default function QuizResultCard({ result }: QuizResultCardProps) {
  const correctAnswers = result.feedback.filter((f) =>
    /^Q\d+:\s+Correct$/.test(f.trim())
  ).length;
  const totalQuestions = result.feedback.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getColorClass = () => {
    if (percentage < 30) return "text-red-600";
    if (percentage < 60) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <Card className="group relative border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
          asChild
        >
          <Link href={`/quiz/results/${result.id}`} title="View">
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium line-clamp-2 pr-8">
          {result.quiz.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs font-medium">
            You scored:{" "}
          </Badge>
          <Badge variant="outline" className="text-xs font-medium">
            <span className={cn(getColorClass())}>{percentage}%</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
