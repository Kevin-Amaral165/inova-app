import { useState } from "react";

type UseFavoritesReturn = {
  favorites: string[];
  toggle: (id: string) => void;
};

const safeParse = (value: string | null): string[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }

    return [];
  } catch {
    return [];
  }
};

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("favorites");
    return safeParse(stored);
  });

  const toggle = (id: string): void => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggle };
};