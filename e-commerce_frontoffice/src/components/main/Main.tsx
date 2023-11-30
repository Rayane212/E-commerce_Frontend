import React, { useState, useEffect } from "react";
import "../../App.css";
import "./Main.css";
import shoe from "../../assets/images/shoe_article.jpeg";
import products from "../../assets/products.json";

export default function Main() {
  /* const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("link to api");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); */

  return (
    <section className="main-section">
      {products.sneakers.map((product: any) => (
        <article id={product.id}>
          <img src={shoe} alt="shoe" />
          <div className="content">
            <div className="info">
              <h2>{product.name}</h2>
              <p>{product.brand}</p>
              <span>{product.price}</span>
            </div>
            <button>Add to cart</button>
          </div>
        </article>
      ))}
    </section>
  );
}
