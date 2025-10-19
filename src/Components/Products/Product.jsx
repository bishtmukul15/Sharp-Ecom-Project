import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const productsArr = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Products = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Products</h2>

      <div className="row">
        {productsArr.map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <img
                src={item.imageUrl}
                className="card-img-top"
                alt={item.title}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text fw-bold">₹{item.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
