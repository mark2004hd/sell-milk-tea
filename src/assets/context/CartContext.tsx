import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  address: string; // Added address field
  phoneNumber: string; // Added phoneNumber field
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  orderHistory: Order[];
  saveOrder: (order: Omit<Order, "id" | "date">) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  // Load dữ liệu từ AsyncStorage khi ứng dụng khởi động
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load cartItems
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }

        // Load orderHistory
        const storedOrderHistory = await AsyncStorage.getItem('orderHistory');
        if (storedOrderHistory) {
          setOrderHistory(JSON.parse(storedOrderHistory));
        }
      } catch (error) {
        console.error("Failed to load data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  // Lưu cartItems vào AsyncStorage mỗi khi nó thay đổi
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cartItems to AsyncStorage:", error);
      }
    };

    saveCartItems();
  }, [cartItems]);

  // Lưu orderHistory vào AsyncStorage mỗi khi nó thay đổi
  useEffect(() => {
    const saveOrderHistory = async () => {
      try {
        await AsyncStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      } catch (error) {
        console.error("Failed to save orderHistory to AsyncStorage:", error);
      }
    };

    saveOrderHistory();
  }, [orderHistory]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.quantity + delta > 0
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const saveOrder = (order: Omit<Order, "id" | "date">) => {
    setOrderHistory((prevHistory) => [
      ...prevHistory,
      {
        id: `order_${Date.now()}`,
        items: order.items,
        total: order.total,
        date: new Date().toISOString(),
        address: order.address, // Save address
        phoneNumber: order.phoneNumber, // Save phoneNumber
      },
    ]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        orderHistory,
        saveOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};