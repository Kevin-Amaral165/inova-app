import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "@/src/store/userStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isLoggingOut = false;

// REQUEST → adiciona token corretamente (SEM erro de tipagem)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useUserStore.getState().token;

  if (token && config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

// RESPONSE → padroniza retorno e erros
api.interceptors.response.use(
  (response) => {
    const data = response.data;

    // API usa status próprio (0 = erro)
    if (data?.status === 0) {
      return Promise.reject({
        message: data?.message || "Erro na requisição",
        isBusinessError: true,
      });
    }

    return data; // 👈 importante para React Query
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    // 401 → logout global
    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      const { logout } = useUserStore.getState();
      logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // erro de rede
    if (!status) {
      return Promise.reject({
        message: "Erro de conexão. Verifique sua internet.",
        isNetworkError: true,
      });
    }

    return Promise.reject({
      message: error.message,
      status,
    });
  }
);