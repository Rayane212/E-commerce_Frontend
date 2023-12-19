import React from "react";
import products from "../../assets/products.json";
import shoe from "../../assets/images/shoe_article.jpeg";
import { FaOpencart } from "react-icons/fa6";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.css";

export default function News() {

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
    <div className="body">
      <Sidebar />
      <main className="main-section">
        {products.sneakers.map((product: any) => (
          <article id={product.id}>
            <img src={shoe} alt="shoe" />
            <div className="content">
              <div className="info">
                <h2>{product.name}</h2>
                <p>{product.brand}</p>
                <span>{product.price}€</span>
              </div>
              <button><FaOpencart /></button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
