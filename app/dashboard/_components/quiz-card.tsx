"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DashboardQuiz } from "@/model";
import { deleteQuiz } from "@/service/quiz-service";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export interface QuizCardProps {
  quiz: DashboardQuiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteQuiz(quiz.id);
      toast.success("Quiz deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred during the deletion of the quiz");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="group relative border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
          asChild
        >
          <Link href={`/quiz/preview/${quiz.id}`} title="View">
            <Eye className="h-4 w-4" />
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete quiz</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the quiz: "
                <strong>{quiz.title}</strong>"?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium line-clamp-2 pr-8">
          {quiz.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs font-medium">
            {quiz.questionCount}{" "}
            {quiz.questionCount === 1 ? "Question" : "Questions"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
