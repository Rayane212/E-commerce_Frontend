import { useShoppingCart } from "../../context/ShoppingCartContext";
import useArticle from "../../hooks/useArticle";
import ProductModel from "../../models/ProductModel";
import formatCurrency from "../../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const { article } = useArticle() as { article: ProductModel[] };
  const item = article.find((item) => item.id === id);
  if (item == null) {
    return null;
  }
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="info">
        <h2>{item.title}</h2>
        <p>{item.category}</p>
        <span>{formatCurrency(item.price)}</span>
      </div>
      <div className="quantity"></div>
    </div>
  );
}
