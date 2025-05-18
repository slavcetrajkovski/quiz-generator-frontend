import { axiosInstance } from "@/config";
import { User } from "@/model";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/user/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "The user is not authenticated!"
    );
  }
};

export const updateUser = async (userRequest: {
  name: string;
  email: string;
}): Promise<User> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.put(`/user/update`, userRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};
