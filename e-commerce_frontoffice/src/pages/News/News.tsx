// import { FaOpencart } from "react-icons/fa6";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.css";
import { Link } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import useArticle from "../../hooks/useArticle";
// import formatCurrency from "../../utils/formatCurrency";
import ProductsItem from "../../components/productsItem/ProductsItem";

export default function News() {
  const { article } = useArticle() as { article: ProductModel[] };
  return (
    <div className="body">
      <Sidebar />
      <main className="main-section">
        {(article as ProductModel[])?.map((product: ProductModel) => (
          <Link to={`/Article/${product.id}`} key={product.id}>
            <ProductsItem {...product} />
          </Link>
        ))}
      </main>
    </div>
  );
}
