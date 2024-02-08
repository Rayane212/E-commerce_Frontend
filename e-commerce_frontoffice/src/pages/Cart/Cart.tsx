import CartItem from "../../components/cartItem/CartItem";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems } = useShoppingCart();
  return <div className="cart">
    {cartItems.map(item=>(
      <CartItem key={item.id} {...item} />
    ))}
  </div>;
}
