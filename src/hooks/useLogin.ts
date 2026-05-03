"use client";

import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/src/services/auth/authService";
import { useUserStore } from "@/src/store/userStore";
import toast from "react-hot-toast";
import { User } from "../store/types";
import { LoginResponse } from "../services/auth/types";

export const useLogin = () => {
  const setUser: (
    user: User,
    token: string,
    remember: boolean
  ) => void = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload) => {
      const data: LoginResponse = await loginRequest(payload);

      if (!data || data.status !== 1 || !data.token_de_acesso) {
        throw new Error(data?.message || "Usuário ou senha inválidos");
      }

      return data;
    },

    onSuccess: (data: any, variables: any) => {
      const token: string = data.token_de_acesso;

      const maxAge: number = variables.remember
        ? 60 * 60 * 24 * 7
        : 60 * 60 * 2;

      document.cookie = `token=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;

      setUser(data.dados_usuario, token, variables.remember);

      toast.success("Login realizado com sucesso");
    },

    onError: (err: any) => {
      toast.error(err.message || "Erro ao fazer login");
    },
  });
};