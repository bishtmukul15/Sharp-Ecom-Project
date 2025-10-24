import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../../Store/CartContext";
import { NavLink } from "react-router-dom";
import Login from "../Auth/Login";
const Header = ({ onCartClick }) => {
  const { cartItems } = useContext(CartContext);
  return (
    <>
      {/* Navbar */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <div>
          <NavLink to="/" className="mx-2 text-white text-decoration-none">
            Home
          </NavLink>
          <NavLink to="/store" className="mx-2 text-white text-decoration-none">
            Store
          </NavLink>
          <NavLink to="/about" className="mx-2 text-white text-decoration-none">
            About
          </NavLink>
          <NavLink to="/login" className="mx-2 text-white text-decoration-none">
            Login
          </NavLink>
          <NavLink
            to="/movies"
            className="mx-2 text-white text-decoration-none"
          >
            Movie
          </NavLink>
          <NavLink
            to="/contactUs"
            className="mx-2 text-white text-decoration-none"
          >
            ContactUs
          </NavLink>
          <NavLink
            to="/productsPage"
            className="mx-2 text-white text-decoration-none"
          >
            ProductsPage
          </NavLink>
        </div>
        <h1 className="m-0">The Generics</h1>
        <button
          className="btn btn-outline-light position-relative"
          onClick={onCartClick}
        >
          🛒 Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItems.length}
          </span>
        </button>
      </header>
    </>
  );
};

export default Header;
