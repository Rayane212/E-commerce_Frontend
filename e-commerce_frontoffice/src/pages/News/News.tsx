import React from "react";
import products from "../../assets/products.json";
import { FaOpencart } from "react-icons/fa6";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.css";
import { NavLink } from "react-router-dom";
import ProductModel from "../../models/ProductModel";

export default function News() {

  function generateRandomImageLink(searchTerm: string) {
    const randomImageLink = `https://source.unsplash.com/random/?sneakers,${searchTerm}`;
    return randomImageLink;
  }

  return (
    <div className="body">
      <Sidebar />
      <main className="main-section">
        {products.sneakers.map((product: ProductModel) => (
          <NavLink to={`/Article/${product.id}`}>
            <article key={product.id}>
              <img src={generateRandomImageLink(`${product.id}`)} alt="shoe" />
              <div className="content">
                <div className="info">
                  <h3>{product.name}</h3>
                  <p>{product.brand}</p>
                  <span>{product.price}€</span>
                </div>
                <button>
                  <FaOpencart />
                </button>
              </div>
            </article>
          </NavLink>
        ))}
      </main>
    </div>
  );
}
