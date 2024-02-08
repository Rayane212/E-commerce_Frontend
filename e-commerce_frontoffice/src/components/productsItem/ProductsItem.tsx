import { FaOpencart } from "react-icons/fa";
import "./ProductsItem.css";
import ProductModel from "../../models/ProductModel";
import formatCurrency from "../../utils/formatCurrency";

export default function ProductsItem({
  id,
  image,
  title,
  category,
  price,
}: ProductModel) {
  return (
    <article>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <div className="content">
        <div className="info">
          <p>{category}</p>
          <span>{formatCurrency(price)}</span>
        </div>
        <button>
          <FaOpencart />
        </button>
      </div>
    </article>
  );
}
