// src/Store/CartContext.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// Create the context
export const CartContext = React.createContext();

const BASE_URL =
  "https://crudcrud.com/api/1f62345b62584a989712f041c52464ec/cart";

const CartProvider = ({ children }) => {
  const { userEmail } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Clean email (crudcrud doesn’t allow @ or .)
  const cleanedEmail = userEmail ? userEmail.replace(/[@.]/g, "") : null;

  // ✅ Add to Cart
  const addToCart = async (product) => {
    // 1️⃣ Update local cart first
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.title === product.title);
      if (existingItem) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // 2️⃣ Save to crudcrud (only if logged in)
    if (cleanedEmail) {
      try {
        await fetch(`${BASE_URL}${cleanedEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product, quantity: 1 }),
        });
      } catch (err) {
        console.error("❌ Error saving cart item:", err);
      }
    }
  };

  // 🗑️ Remove item from cart
  const removeFromCart = async (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));

    if (cleanedEmail) {
      try {
        const res = await fetch(`${BASE_URL}${cleanedEmail}`);
        const data = await res.json();

        const itemToDelete = data.find((item) => item.title === title);
        if (itemToDelete) {
          await fetch(`${BASE_URL}${cleanedEmail}/${itemToDelete._id}`, {
            method: "DELETE",
          });
        }
      } catch (err) {
        console.error("❌ Error deleting item:", err);
      }
    }
  };

  // 🔄 Fetch cart items on login or page reload
  useEffect(() => {
    const fetchCart = async () => {
      if (!cleanedEmail) return;

      try {
        const res = await fetch(`${BASE_URL}${cleanedEmail}`);
        if (!res.ok) throw new Error("Failed to fetch cart data");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [cleanedEmail]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
