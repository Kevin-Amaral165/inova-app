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
      className="w-full bg-white border-t shadow-md flex items-center justify-center"
      aria-label="Paginação de produtos"
    >
      <nav
        className="flex gap-2"
        aria-label="Navegação entre páginas"
      >
        <button
          disabled={page === 1}
          aria-disabled={page === 1}
          aria-label="Página anterior"
          onClick={() => onChangePage(page - 1)}
          className="px-3 py-1 bg-white border rounded disabled:opacity-50"
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          const isActive = page === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => onChangePage(pageNumber)}
              aria-label={`Ir para página ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
              className={`px-3 py-1 rounded transition ${
                isActive
                  ? "bg-[#84C318] text-white"
                  : "bg-white border"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          aria-disabled={page === totalPages}
          aria-label="Próxima página"
          onClick={() => onChangePage(page + 1)}
          className="px-3 py-1 bg-white border rounded disabled:opacity-50"
        >
          →
        </button>
      </nav>
    </footer>
  );
}