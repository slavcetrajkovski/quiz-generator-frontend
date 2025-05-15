import { axiosInstance } from "@/config";
import { AxiosError } from "axios";

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export const getCurrentUser = async (): Promise<UserDTO> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const response = await axiosInstance.get<UserDTO>("/user/current", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });


        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Failed to fetch user:", {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
        });
        throw error;
    }
};

export const updateUser = async (
    id: number,
    data: { name: string; email: string }
): Promise<UserDTO> => {
    try {
        const response = await axiosInstance.put<UserDTO>(
            `/user/update/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Failed to update user:", {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
        });
        throw error;
    }
};
