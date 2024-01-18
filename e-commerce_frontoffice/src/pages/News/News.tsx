import { FaOpencart } from "react-icons/fa6";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.css";
import { NavLink } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import useArticle from "../../hooks/useArticle";

export default function News() {
  // const { data: products } = useFetch();
  const { article } = useArticle() as { article: ProductModel[] };
  return (
    <div className="body">
      <Sidebar />
      <main className="main-section">
        {(article as ProductModel[])?.map((product: ProductModel) => (
          <NavLink to={`/Article/${product.id}`} key={product.id}>
            <article>
              <img src={product.image} alt={product.title} />
              <div className="content">
                <div className="info">
                  <h3>{product.title}</h3>
                  <p>{product.category}</p>
                  <span>{((product?.price * 100) / 100).toFixed(2)}€</span>
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
