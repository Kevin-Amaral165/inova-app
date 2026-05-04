"use client";

import { JSX } from "react";
import { LoadingProps } from "./loading.types";

export function Loading({
  message = "Carregando...",
  fullScreen = true,
}: LoadingProps): JSX.Element {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3 p-4
        ${fullScreen ? "h-screen w-full fixed inset-0 bg-white/80 z-[100]" : "h-full w-full"}
      `}
    >
      <div className="w-6 h-6 md:w-8 md:h-8 border-2 md:border-4 border-gray-200 border-t-[#84C318] rounded-full animate-spin" />

      {message && (
        <p className="text-xs md:text-sm text-gray-600 font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
}