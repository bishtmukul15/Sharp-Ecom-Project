import React from "react";
import Product from "../src/Components/Products/Product";
import Header from "./Components/Header/Header";
import Cart from "./Components/Cart/Cart";
const App = () => {
  return (
    <div>
      <Header />
      <Product />
      <Cart />
    </div>
  );
};

export default App;
