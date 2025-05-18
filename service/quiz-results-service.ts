import { axiosInstance } from "@/config";
import { UserQuizResults } from "@/model";

export const submitQuizResults = async (
  quizId: number,
  answers: Record<number, string>,
  timeTakenMillis: number
): Promise<UserQuizResults> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      `/results/${quizId}/submit`,
      {
        answers,
        timeTakenMillis,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Поднесувањето на квизот не успеа"
    );
  }
};

export const getResultById = async (
  resultId: number
): Promise<UserQuizResults> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/results/${resultId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Не успеавме да ги вчитаме резултатите"
    );
  }
};

export const exportQuizAsJson = async (quizId: number): Promise<Blob> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/results/${quizId}/export/json`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Quiz couldn't be exported"
    );
  }
};

export const exportQuizAsPdf = async (quizId: number): Promise<Blob> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/results/${quizId}/export/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Quiz couldn't be exported"
    );
  }
};

export const getResutlsForUserQuizzes = async (): Promise<UserQuizResults[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/results/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "An error occured while fetching results"
    );
  }
};
