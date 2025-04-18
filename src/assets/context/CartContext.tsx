import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LOCAL_IPV4_ADDRESS, PORT } from "@env";
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  fetchCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Base URL for your Spring Boot backend (same as in PromotionsContext.tsx)
const API_BASE_URL = `http://http://${LOCAL_IPV4_ADDRESS}:${PORT}/zen8labs-system/api`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (data.response === "Success") {
        setCartItems(data.cartItems); // Adjust based on your API response structure
      } else {
        console.log("Failed to fetch cart items:", data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Add item to cart via API
  const addToCart = async (item: CartItem) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/add`,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: item.quantity,
        },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.response === "Success") {
        await fetchCartItems(); // Refresh cart after adding
      } else {
        console.log("Failed to add item to cart:", data);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Update quantity of an item in the cart via API
  const updateQuantity = async (id: string, delta: number) => {
    try {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + delta);
      const response = await axios.put(
        `${API_BASE_URL}/cart/update`,
        { id, quantity: newQuantity },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.response === "Success") {
        await fetchCartItems(); // Refresh cart after updating
      } else {
        console.log("Failed to update quantity:", data);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item from cart via API
  const removeFromCart = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart/remove/${id}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (data.response === "Success") {
        await fetchCartItems(); // Refresh cart after removing
      } else {
        console.log("Failed to remove item from cart:", data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Fetch cart items when the provider mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, fetchCartItems }}>
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