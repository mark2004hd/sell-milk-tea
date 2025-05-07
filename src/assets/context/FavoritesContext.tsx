// Import các hook và types cần thiết từ React
import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho mỗi mục yêu thích
export interface FavoriteItem {
  id: string;             // ID duy nhất của mục
  title: string;          // Tiêu đề của mục
  price: number;          // Giá của mục
  image: string;          // URL hình ảnh của mục
  description: string;    // Mô tả chi tiết
  size: "S" | "M" | "L";   // Kích cỡ của mục
  tag?: string;           // (Tuỳ chọn) thẻ dán (ví dụ: "Mới", "Sale")
  tagColor?: string;      // (Tuỳ chọn) màu của thẻ
}

// Định nghĩa kiểu dữ liệu cho Context
interface FavoritesContextType {
  favorites: FavoriteItem[]; // Mảng chứa các mục yêu thích
  addToFavorites: (item: FavoriteItem) => void; // Hàm để thêm mục vào yêu thích
  removeFromFavorites: (id: string, size: "S" | "M" | "L") => void; // Hàm xoá mục khỏi yêu thích
}

// Tạo Context mặc định chưa có giá trị
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Tạo Provider để bọc các thành phần sử dụng context
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Khởi tạo state để lưu danh sách yêu thích
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Hàm thêm mục vào danh sách yêu thích
  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      // Kiểm tra xem mục đó đã tồn tại chưa (theo id và size)
      const exists = prevFavorites.some(
        (fav) => fav.id === item.id && fav.size === item.size
      );
      // Nếu chưa tồn tại thì thêm vào danh sách
      if (!exists) {
        return [...prevFavorites, item];
      }
      // Nếu đã tồn tại thì không làm gì
      return prevFavorites;
    });
  };

  // Hàm xoá mục khỏi danh sách yêu thích theo id và size
  const removeFromFavorites = (id: string, size: "S" | "M" | "L") => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Truyền các giá trị và hàm điều khiển xuống các component con thông qua Context Provider
  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook để sử dụng FavoritesContext một cách dễ dàng trong component
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  // Nếu hook được dùng ngoài Provider thì báo lỗi
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
