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
        flex flex-col items-center justify-center gap-3
        ${fullScreen ? "h-screen" : "h-full"}
      `}
    >
      <div className="w-6 h-6 border-2 border-gray-300 border-t-[#84C318] rounded-full animate-spin" />

      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}