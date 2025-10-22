import React, { useState } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  BrowserRouter,
} from "react-router-dom";
import Product from "../src/Components/Products/Product";
import Header from "./Components/Header/Header";
import Cart from "./Components/Cart/Cart";
import { CartProvider } from "./Store/CartContext";
import About from "./Components/AboutPage/About";
import Home from "./Components/Home/Home";
import Movie from "./Components/Movies/Movie";
import ContactUs from "./Components/ContactUs/ContactUs";
const App = () => {
  const [showCart, setShowCart] = useState(false);
  const handleToggleClick = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <CartProvider>
      <BrowserRouter>
        <Header onCartClick={handleToggleClick} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/store" element={<Product />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>

        {showCart && <Cart showCart={showCart} />}
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
