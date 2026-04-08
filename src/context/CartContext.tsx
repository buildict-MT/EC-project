import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CartItem {
  cartId: string;
  id: number;
  base_name: string;
  category: string;
  specs: { [key: string]: string };
  length: number;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const cartId = `${item.id}-${JSON.stringify(item.specs)}-${item.length}-${Date.now()}`;
    setCart(prev => [...prev, { ...item, cartId }]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
