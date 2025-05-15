import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json" // Ensure JSON content type
    }
});

axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") { // Safe for SSR
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login'
            }
        }
        return Promise.reject(error)
    }
)

