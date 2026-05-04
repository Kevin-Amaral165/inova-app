"use client";

import { JSX } from "react";
import { FooterProps } from "./footer.types";

export function Footer({
  page,
  totalPages,
  onChangePage,
}: FooterProps): JSX.Element | null {
  if (totalPages <= 1) return null;

  return (
    <footer
      className="w-full bg-white border-t shadow-md flex items-center justify-center h-[60px] shrink-0"
      aria-label="Paginação de produtos"
    >
      <nav
        className="flex gap-1 md:gap-2 px-2"
        aria-label="Navegação entre páginas"
      >
        <button
          disabled={page === 1}
          aria-disabled={page === 1}
          aria-label="Página anterior"
          onClick={() => onChangePage(page - 1)}
          className="px-2 md:px-3 py-1 bg-white border rounded disabled:opacity-50 text-sm md:text-base"
        >
          ←
        </button>

        <div className="flex gap-1 md:gap-2 max-w-[200px] md:max-w-none overflow-x-auto no-scrollbar">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            const isActive = page === pageNumber;

            return (
              <button
                key={pageNumber}
                onClick={() => onChangePage(pageNumber)}
                aria-label={`Ir para página ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
                className={`px-2 md:px-3 py-1 rounded transition text-sm md:text-base ${
                  isActive
                    ? "bg-[#84C318] text-white"
                    : "bg-white border"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          disabled={page === totalPages}
          aria-disabled={page === totalPages}
          aria-label="Próxima página"
          onClick={() => onChangePage(page + 1)}
          className="px-2 md:px-3 py-1 bg-white border rounded disabled:opacity-50 text-sm md:text-base"
        >
          →
        </button>
      </nav>
    </footer>
  );
}