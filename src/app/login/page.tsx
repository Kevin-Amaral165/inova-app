"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/hooks/useLogin";
import { useUserStore } from "@/src/store/userStore";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, senha: password, remember: true },
      {
        onSuccess: () => {
          router.push("/produtos");
        },
      }
    );
  };

  const store = useUserStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {loginMutation.isError && (
          <p className="text-red-500 text-sm text-center">
            {(loginMutation.error as Error)?.message || "Erro ao fazer login"}
          </p>
        )}

        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Entrando..." : "Entrar"}
        </button>

        <button
          type="button"
          onClick={() => alert("Não implementado")}
          className="text-sm text-gray-500 underline"
        >
          Esqueceu a senha?
        </button>
      </form>
    </div>
  );
}