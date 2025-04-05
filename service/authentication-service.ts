import { axiosInstance } from "@/config";

export const login = async (
    email: string,
    password: string
  ): Promise<{ token: string }> => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email,
          password,
        },
      );
  
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Невалиден обид за најава"
      );
    }
  };
  
  export const register = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<{ token: string }> => {
    try {
      const response = await axiosInstance.post(
        "/auth/register",
        {
          fullName,
          email,
          password,
        },
      );
  
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Невалиден обид за регистрација"
      );
    }
  };