"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/hooks/useLogin";
import { Input } from "@/src/components/input/input";
import { Button } from "@/src/components/button/button";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";


export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, senha: password, remember },
      {
        onSuccess: () => {
          router.push("/produtos");
        },
      }
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      
      <img
        src="/images/login-bg.jpg"
        alt="background"
        className="
          absolute inset-0 
          w-full h-full 
          object-cover
          object-fill
        "
      />

      <div className="relative z-10 flex flex-col items-center">
        
        <h1 className="text-3xl font-semibold text-[#84C318] mb-8">
          Bem-vindo a Innovation Brindes
        </h1>

        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="
            bg-[#84C318]
            w-[420px]
            p-10
            rounded-2xl
            shadow-[0_20px_40px_rgba(0,0,0,0.2)]
            flex flex-col gap-5
          "
        >
          {loginMutation.isError && (
            <p className="text-white text-sm text-center">
              {(loginMutation.error as Error)?.message ||
                "Erro ao fazer login"}
            </p>
          )}

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<UserIcon width={16} height={16} />}
            />

            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockClosedIcon width={16} height={16} />}
            />
          </div>

          <div className="flex justify-between items-center text-sm text-white mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-white"
              />
              Manter logado
            </label>

            <span className="cursor-pointer hover:underline">
              Esqueceu a senha?
            </span>
          </div>

          <Button
            htmlType="submit"
            loading={loginMutation.isPending}
            className="
              mt-4 
              bg-white 
              text-gray-700 
              hover:bg-gray-100 
              shadow-md
            "
          >
            {loginMutation.isPending ? "Entrando..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}