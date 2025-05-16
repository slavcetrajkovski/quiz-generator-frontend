import axios from "axios";
import { logout } from "@/service/authentication-service";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);