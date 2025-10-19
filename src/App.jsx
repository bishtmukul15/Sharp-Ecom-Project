import React, { useState } from "react";
import Product from "../src/Components/Products/Product";
import Header from "./Components/Header/Header";
import Cart from "./Components/Cart/Cart";
const App = () => {
  const [showCart, setShowCart] = useState(false);
  const handleToggleClick = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <div>
      <Header onCartClick={handleToggleClick} />
      <Product />
      <Cart showCart={showCart} />
    </div>
  );
};

export default App;
