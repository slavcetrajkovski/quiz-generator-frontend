import { axiosInstance } from "@/config";
import { Question } from "@/model";

export const generateQuestions = async (
  quizId: number
): Promise<Question[]> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      `/questions/generate/${quizId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Не можат да се генерираат прашања"
    );
  }
};

export const fetchQuestions = async (quizId: number): Promise<Question[]> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get(`/questions/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Не можат да се пронајдат прашањата"
    );
  }
};

export const saveQuestions = async (
  quizId: number,
  questions: Question[]
): Promise<void> => {
  const token = localStorage.getItem("token");

  try {
    await axiosInstance.put(`/questions/${quizId}`, questions, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Не можат да се зачуваат прашањата"
    );
  }
};
