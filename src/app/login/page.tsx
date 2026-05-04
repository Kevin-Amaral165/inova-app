"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/hooks/useLogin";
import { Input } from "@/src/components/input/input";
import { Button } from "@/src/components/button/button";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useUserStore } from "@/src/store/userStore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseMutationResult } from "@tanstack/react-query";
import { Loading } from "@/src/components/loading/loading";
import { HtmlType, InputType } from "@/src/enum/enum";

export default function LoginPage(): JSX.Element {
  const router: AppRouterInstance = useRouter();
  const loginMutation: UseMutationResult = useLogin();

  const token: string | null = useUserStore((store) => store.token);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);

    useEffect(() => {
    if (token) {
      router.replace("/produtos");
    }
  }, [token]);

  const handleSubmit: (e: React.FormEvent) => void = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, senha: password, remember },
      {
        onSuccess: () => {
          router.replace("/produtos");
        },
      }
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <img
        src="/images/login-bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center px-4 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#84C318] mb-8 text-center">
          Bem-vindo a Innovation Brindes
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#84C318] w-full max-w-[420px] p-6 md:p-10 rounded-2xl shadow-lg flex flex-col gap-5"
        >
          {loginMutation.isPending && (
            <Loading fullScreen={false} />
          )}

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Usuário"
              value={email}
              onChange={setEmail}
              icon={<UserIcon width={16} height={16} />}
              data-testid="input-email"
            />

            <Input
              type={InputType.PASSWORD}
              placeholder="Senha"
              value={password}
              onChange={setPassword}
              icon={<LockClosedIcon width={16} height={16} />}
              data-testid="input-password"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-white mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Manter logado
            </label>

            <span className="cursor-pointer hover:underline">
              Esqueceu a senha?
            </span>
          </div>

          <Button
            htmlType={HtmlType.SUBMIT}
            loading={loginMutation.isPending}
            className="mt-4 bg-white text-gray-700 hover:bg-gray-100"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}