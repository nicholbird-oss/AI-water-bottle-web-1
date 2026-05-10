import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, BottleColor, BottleSize } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (color: BottleColor, size: BottleSize) => void;
  removeFromCart: (id: string, color: BottleColor, size: BottleSize) => void;
  updateQuantity: (id: string, color: BottleColor, size: BottleSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (color: BottleColor, size: BottleSize) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.color === color && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.color === color && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const price = size === 'Large' ? 34.99 : 29.99;
      return [...prev, { id: 'pure-steel-bottle', color, size, quantity: 1, price }];
    });
  };

  const removeFromCart = (id: string, color: BottleColor, size: BottleSize) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color && item.size === size)));
  };

  const updateQuantity = (id: string, color: BottleColor, size: BottleSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
