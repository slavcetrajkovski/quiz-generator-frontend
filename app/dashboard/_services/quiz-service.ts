import { axiosInstance } from "@/config";
import { Quiz } from "@/model";

export interface DashboardQuiz {
    id: number;
    title: string;
    questionCount: number;
}

export const deleteQuiz = async (quizId: number): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        await axiosInstance.delete(`/quiz/${quizId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Не може да се избрише квизот"
        );
    }
};

export const fetchRecentQuizzes = async (): Promise<DashboardQuiz[]> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return [];
        }

        const response = await axiosInstance.get<Quiz[]>("/quiz/all/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
            questionCount: quiz.questions?.length || 0,
        }));
    } catch (error) {
        return [];
    }
};