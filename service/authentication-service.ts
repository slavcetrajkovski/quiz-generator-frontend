import { axiosInstance } from "@/config";
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const login = async (
    email: string,
    password: string
): Promise<{ token: string }> => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Невалиден обид за најава");
  }
};

export const register = async (
    name: string,
    email: string,
    password: string
): Promise<{ token: string }> => {
  try {
    const response = await axiosInstance.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Невалиден обид за регистрација");
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem("token");
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;

  toast.error('Сесијата е истечена');

  localStorage.removeItem("token");
  window.location.href = '/login';
};

export const checkTokenExpiration = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('token');
  if (!token) return true;

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};