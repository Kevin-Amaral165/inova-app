import { useEffect, useState } from "react";

type UseFavoritesReturn = {
  favorites: string[];
  toggle: (id: string) => void;
};

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggle = (id: string): void => {
    let updated: string[];

    if (favorites.includes(id)) {
      updated = favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return { favorites, toggle };
};