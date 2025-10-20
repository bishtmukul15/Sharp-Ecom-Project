import React, { useContext, useState } from "react";
import { CartContext } from "../../Store/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container my-5 text-center">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart yet!</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            className="d-flex justify-content-around align-items-center mb-3 border p-3 rounded shadow-sm"
          >
            <img src={item.imageUrl} alt={item.title} width="80" />
            <div>
              <h5>{item.title}</h5>
              <p>Price: ₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => removeFromCart(item.title)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
