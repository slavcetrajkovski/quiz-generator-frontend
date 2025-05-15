import { axiosInstance } from "@/config";
import axios from "axios";

export const login = async (
    email: string,
    password: string
): Promise<{ token: string }> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error: any) {
    throw new Error(
        error.response?.data?.message || "Невалиден обид за најава"
    );
  }
};

export const register = async (
    name: string,
    email: string,
    password: string
) => {
  try {
    const registerInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const response = await registerInstance.post("/auth/register", {
      name,
      email,
      password
    });

    return response.data;
  } catch (error: any) {
    console.error("Registration error details:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

export const logout = (): void => {
  localStorage.removeItem("token");
};