import React, { useState } from "react";

// 1️⃣ Create the Context
export const CartContext = React.createContext();

// 2️⃣ Create the Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🧠 Function to add items to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.title === product.title
      );

      if (existingItemIndex >= 0) {
        // increase quantity if already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 🧠 Function to remove items from cart
  const removeFromCart = (title) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== title)
    );
  };

  // 🧠 Context value
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
