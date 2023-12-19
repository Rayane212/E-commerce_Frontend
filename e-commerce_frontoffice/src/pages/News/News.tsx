import React from "react";
import products from "../../assets/products.json";
import shoe from "../../assets/Images/shoe_article.jpeg";
import { FaOpencart } from "react-icons/fa6";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.css";
import { NavLink } from "react-router-dom";

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

  function generateRandomImageLink(searchTerm: string) {
    const randomImageLink = `https://source.unsplash.com/random/?sneakers,${searchTerm}`;
    return randomImageLink;
  }

  return (
    <div className="body">
      <Sidebar />
      <main className="main-section">
        {products.sneakers.map((product: any) => (
          <NavLink to={`/Article/${product.id}`}>
            <article id={product.id}>
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
