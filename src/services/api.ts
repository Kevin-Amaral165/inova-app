import axios, { AxiosError, AxiosInstance } from "axios";
import { useUserStore } from "@/src/store/userStore";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

let isRefreshing: boolean = false;

api.interceptors.request.use((config) => {
  const token: string | null = useUserStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError) => {
    const status: number | undefined = error.response?.status;
    const url: string | undefined = error.config?.url;

    if (url?.includes("/login/acessar")) {
      return Promise.reject(error);
    }

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        const { logout } = useUserStore.getState();
        logout();

        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);