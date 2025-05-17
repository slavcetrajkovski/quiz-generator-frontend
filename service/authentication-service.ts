import { axiosInstance } from "@/config";

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
): Promise<{ token: string }> => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Невалиден обид за регистрација"
    );
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};
