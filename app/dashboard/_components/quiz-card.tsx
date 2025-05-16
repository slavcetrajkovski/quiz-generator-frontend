"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {DashboardQuiz, deleteQuiz } from "../_services/quiz-service";
import { Button } from "@/components/ui/button";
import {Eye, Pencil, Trash2} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

export default function QuizCard({ quiz }: { quiz: DashboardQuiz }) {
    const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteQuiz(quiz.id);
            toast.success("Quiz deleted successfully");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
            if (error.message.includes("permission") || error.message.includes("authenticated")) {
                router.push("/login");
            }
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
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
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-yellow-50 hover:text-yellow-600 shadow-sm"
                    asChild
                >
                    <Link href={`/quiz/edit/${quiz.id}`} title="Edit">
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowDeleteDialog(true);
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>

            </div>

            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold mb-2">Бришење на квиз</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Дали сте сигурни дека сакате да го избришете квизот: "{quiz.title}"?
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteDialog(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Card Content */}
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium line-clamp-2 pr-8">
                    {quiz.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs font-medium">
                        {quiz.questionCount} {quiz.questionCount === 1 ? 'Question' : 'Questions'}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}