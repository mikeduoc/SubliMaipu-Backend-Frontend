import React, { createContext, useState, useContext } from 'react';


const ContextoCarrito = createContext(null);
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {

      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
  return <ContextoCarrito.Provider value={value}>{children}</ContextoCarrito.Provider>;
}

export function useCart() {
  return useContext(ContextoCarrito);
}