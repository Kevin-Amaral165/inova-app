"use client";

import { useUserStore } from "@/src/store/userStore";
import { useRouter } from "next/navigation";

export default function ProdutosPage() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <h1 className="text-2xl font-bold">
        Bem-vindo, {user?.nome_usuario || "Usuário"} 👋
      </h1>

      <p className="text-gray-600">
        Você está logado na dashboard.
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}