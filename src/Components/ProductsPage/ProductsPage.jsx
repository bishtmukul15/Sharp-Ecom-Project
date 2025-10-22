import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: "p1",
    name: "Cool Sneakers",
    image: "sneaker1.jpg",
  },
  {
    id: "p2",
    name: "Classic Watch",
    image: "watch1.jpg",
  },
  {
    id: "p3",
    name: "Stylish Backpack",
    image: "bag1.jpg",
  },
];

const ProductsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Our Products</h2>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{product.name}</h3>
            {/* 👇 Navigate to details page */}
            <Link to={`/products/${product.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
