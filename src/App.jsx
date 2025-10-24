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
import AuthContextProvider from "./Store/AuthContext";
import About from "./Components/AboutPage/About";
import Home from "./Components/Home/Home";
import Movie from "./Components/Movies/Movie";
import ContactUs from "./Components/ContactUs/ContactUs";
import ProductsPage from "./Components/ProductsPage/ProductsPage";
import ProductDetails from "./Components/ProductsPage/ProductDetails";
import Login from "./Components/Auth/Login";
const App = () => {
  const [showCart, setShowCart] = useState(false);
  const handleToggleClick = () => {
    setShowCart((prev) => !prev);
  };
  return (
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
          <Header onCartClick={handleToggleClick} />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route path="/store" element={<Product />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/productsPage" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
          </Routes>

          {showCart && <Cart showCart={showCart} />}
        </BrowserRouter>
      </CartProvider>
    </AuthContextProvider>
  );
};

export default App;
