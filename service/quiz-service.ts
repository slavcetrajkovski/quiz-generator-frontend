import { axiosInstance } from "@/config";
import { Quiz } from "@/model";

export const createQuiz = async (params: {
  title: string;
  pdf: File;
}): Promise<Quiz> => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", params.title);
    formData.append("pdf", params.pdf);

    const response = await axiosInstance.post("/quiz/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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
