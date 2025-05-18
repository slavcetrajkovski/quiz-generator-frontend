import { axiosInstance } from "@/config";
import { DashboardQuiz, Quiz } from "@/model";

export const createQuiz = async (params: {
  title: string;
  file: File;
}): Promise<Quiz> => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("file", params.file);

    const response = await axiosInstance.post("/quiz/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Невалиден обид за создавање на квиз"
    );
  }
};

export const findQuizById = async (id: number): Promise<Quiz> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Квизот не постои");
  }
};

export const deleteQuiz = async (quizId: number): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    await axiosInstance.delete(`/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "An error occures during the deletion of the quiz"
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

export const getAllQuizzesByUser = async (): Promise<Quiz[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/quiz/all/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Не се пронајдени квизови за тој корисник"
    );
  }
};
