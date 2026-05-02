"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/src/services/auth/authService";
import { useUserStore } from "@/src/store/userStore";
import { LoginPayload, LoginResponse } from "../services/auth/types";
import { useRouter } from "next/navigation";
import { User } from "../store/types";

export const useLogin = () => {
  const setUser: (user: User, token: string, remember: boolean) => void = useUserStore((
    state,
  ) => state.setUser);
  const router: AppRouterInstance = useRouter();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async ({ email, senha, remember }) => {
      const data: LoginResponse = await loginRequest({ email, senha, remember });

      if (data.status !== 1) {
        throw new Error("Usuário ou senha inválidos");
      }

      return data;
    },

    onSuccess: (data, variables) => {
      setUser(
        data.dados_usuario as User,
        data.token_de_acesso,
        variables.remember
      );

      document.cookie = `token=${data.token_de_acesso}; path=/; SameSite=Lax`;

      router.push("/produtos");
    },

    onError: (error) => {
      console.error("Erro no login:", error.message);
    },
  });
};