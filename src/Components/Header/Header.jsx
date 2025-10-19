import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "../Cart/Cart";
const Header = ({ onCartClick }) => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                HOME
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                STORE
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                ABOUT
              </a>
            </li>
          </ul>
        </div>
        <button className="btn btn-outline-light" onClick={onCartClick}>
          Cart
        </button>
      </nav>

      {/* Title Section */}
      <header className="bg-secondary text-white text-center py-4">
        <h1 className="display-5 fw-bold">The Generics</h1>
      </header>
    </>
  );
};

export default Header;
