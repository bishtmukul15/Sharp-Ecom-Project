import React, { useState } from "react";
import Product from "../src/Components/Products/Product";
import Header from "./Components/Header/Header";
import Cart from "./Components/Cart/Cart";
import { CartProvider } from "./Store/CartContext";
const App = () => {
  const [showCart, setShowCart] = useState(false);
  const handleToggleClick = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <CartProvider>
      <Header onCartClick={handleToggleClick} />
      <Product />
      {showCart && <Cart showCart={showCart} />}
    </CartProvider>
  );
};

export default App;
