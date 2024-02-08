import { FaOpencart } from "react-icons/fa";
import "./ProductsItem.css";
import ProductModel from "../../models/ProductModel";
import formatCurrency from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function ProductsItem({
  id,
  image,
  title,
  category,
  price,
}: ProductModel) {

  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <article>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <div className="content">
        <div className="info">
          <p>{category}</p>
          <span>{formatCurrency(price)}</span>
        </div>
        <button onClick={()=>{increaseCartQuantity(id)}}>
          <FaOpencart />
        </button>
      </div>
    </article>
  );
}
