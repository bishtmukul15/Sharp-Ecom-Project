import React, { useState } from "react";
const cartElements = [
  {
    title: "Colors",

    price: 100,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",

    quantity: 2,
  },

  {
    title: "Black and white Colors",

    price: 50,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",

    quantity: 3,
  },

  {
    title: "Yellow and Black Colors",

    price: 70,

    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",

    quantity: 1,
  },
];
const Cart = ({ showCart }) => {
  return (
    <div className="container my-5 text-center">
      <h2>Cart: {showCart ? cartElements.length : 0}</h2>

      {showCart && (
        <div>
          {cartElements.map((item, index) => (
            <div key={index}>
              <img src={item.imageUrl} />
              <div>
                <h1>{item.title}</h1>
                <p>Price: {item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <button>remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
