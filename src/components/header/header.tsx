"use client";

import { JSX } from "react";
import { useUserStore } from "@/src/store/userStore";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/src/components/dropdown/dropdown";
import { Position } from "@/src/enum/enum";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User } from "@/src/store/types";

export function Header(): JSX.Element {
  const user: User | null = useUserStore((s) => s.user);
  const logout: () => void = useUserStore((s) => s.logout);
  const router: AppRouterInstance = useRouter();

  function handleLogout(): void {
    logout();
    router.push("/login");
  }

  return (
    <div className="w-full bg-[#84C318] text-white px-6 py-3 flex items-center justify-between shadow-md overflow-visible">
      <div className="flex items-center gap-2">
        <div className="font-bold text-lg">Innovation</div>
        <span className="text-xs opacity-80">BRINDES</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right text-sm">
          <p className="font-semibold">
            {user?.nome_usuario}
          </p>
          <p className="text-xs opacity-80">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        <Dropdown
          position={Position.BOTTOM_RIGHT}
          trigger={
            <img
              alt={`Avatar de ${user?.nome_usuario ?? "usuário"}`}
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          }
          items={[
            { label: "Configurações", disabled: true },
            { divider: true },
            { label: "Sair", onClick: handleLogout },
          ]}
        />
      </div>
    </div>
  );
}