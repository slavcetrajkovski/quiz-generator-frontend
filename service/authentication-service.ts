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

// Function to check auth status
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

// To clear token on logout
export const logout = (): void => {
  localStorage.removeItem("token");
};