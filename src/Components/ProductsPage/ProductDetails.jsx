import React from "react";
import { useParams, Link } from "react-router-dom";

const productData = {
  p1: {
    name: "Cool Sneakers",
    images: ["/sneaker1.jpg", "/sneaker2.jpg", "/sneaker3.jpg"],
    reviews: [
      { id: 1, text: "Very comfortable and stylish!" },
      { id: 2, text: "Worth every penny!" },
    ],
  },
  p2: {
    name: "Classic Watch",
    images: ["/watch1.jpg", "/watch 2.jpg"],
    reviews: [
      { id: 1, text: "Elegant and classy look." },
      { id: 2, text: "Perfect for gifting!" },
    ],
  },
  p3: {
    name: "Stylish Backpack",
    images: ["/bag1.jpg", "/bag2.jpg"],
    reviews: [
      { id: 1, text: "Spacious and durable." },
      { id: 2, text: "Loved the design and color!" },
    ],
  },
};

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productData[productId];

  if (!product) {
    return <h2>❌ Product not found!</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/productsPage">⬅️ Back to Products</Link>
      <h2>{product.name}</h2>

      {/* 🖼️ Product Images */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} ${index + 1}`}
            style={{ width: "200px", borderRadius: "10px" }}
          />
        ))}
      </div>

      {/* 💬 Reviews Section */}
      <div>
        <h3>Customer Reviews:</h3>
        <ul>
          {product.reviews.map((review) => (
            <li key={review.id}>⭐ {review.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
