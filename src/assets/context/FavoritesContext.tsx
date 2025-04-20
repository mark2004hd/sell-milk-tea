import React, { createContext, useContext, useState, ReactNode } from "react";

interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  size: "S" | "M" | "L";
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string, size: "S" | "M" | "L") => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (fav) => fav.id === item.id && fav.size === item.size
      );
      if (!exists) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (id: string, size: "S" | "M" | "L") => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => !(item.id === id && item.size === size))
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};