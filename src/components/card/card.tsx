"use client";

import { Button } from "@/src/components/button/button";
import { CardProps } from "./card.types";
import { ButtonVariant } from "@/src/enum/enum";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { JSX } from "react";

export function Card({
  isFavorite,
  onClick,
  onToggleFavorite,
  product,
}: CardProps): JSX.Element {
  return (
    <article
      className="
        bg-white 
        rounded-xl md:rounded-2xl 
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        transition-all duration-200
        p-3 md:p-4 
        flex flex-col gap-2 md:gap-3 
        relative
        hover:-translate-y-[2px]
        h-full
      "
      aria-label={`Produto ${product.nome}, código ${product.codigo}`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        aria-label={
          isFavorite
            ? `Remover ${product.nome} dos favoritos`
            : `Adicionar ${product.nome} aos favoritos`
        }
        aria-pressed={isFavorite}
        className="
          absolute top-3 right-3 
          hover:scale-110 
          active:scale-95
          transition
          cursor-pointer
        "
      >
        {isFavorite ? (
          <SolidHeart
            className="w-5 h-5 text-red-500"
            aria-hidden="true"
          />
        ) : (
          <OutlineHeart
            className="w-5 h-5 text-gray-400 hover:text-red-400 transition"
            aria-hidden="true"
          />
        )}
      </button>

      <div
        className="w-full h-[100px] md:h-[130px] flex items-center justify-center"
        aria-label={`Imagem do produto ${product.nome}`}
      >
        <img
          src={product.imagem}
          alt={`Imagem do produto ${product.nome}`}
          className="max-h-full object-contain"
        />
      </div>

      <span
        className="text-[10px] bg-[#84C318] text-white px-2 py-[2px] rounded-full w-fit font-medium"
        aria-label="Produto exclusivo"
      >
        EXCLUSIVO
      </span>

      <h2 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[34px]">
        {product.nome}
      </h2>

      <p className="text-xs text-gray-400">
        Código do produto: {product.codigo}
      </p>

      <p
        className="text-[#84C318] font-bold text-base"
        aria-label={`Preço ${product.preco} reais`}
      >
        R$ {Number(product.preco).toFixed(2)}
      </p>

      <Button
        variant={ButtonVariant.DRAWER}
        onClick={onClick}
        aria-label={`Ver detalhes do produto ${product.nome}`}
      >
        CONFIRA
      </Button>
    </article>
  );
}