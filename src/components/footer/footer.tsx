"use client";

import { JSX } from "react";
import { FooterProps } from "./footer.types";

export function Footer({ page, totalPages, onChangePage }: FooterProps): JSX.Element | null {
  if (totalPages <= 1) return null;

  return (
    <footer className="w-full h-full bg-white border-t shadow-md flex items-center justify-center">
      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
          className="px-3 py-1 bg-white border rounded disabled:opacity-50"
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChangePage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-[#84C318] text-white"
                : "bg-white border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => onChangePage(page + 1)}
          className="px-3 py-1 bg-white border rounded disabled:opacity-50"
        >
          →
        </button>
      </div>
    </footer>
  );
}