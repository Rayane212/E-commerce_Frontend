import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa";
import logo from "../../assets/Images/Sneaker-removebg-preview.png";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function Navbar() {
  const { cartQuantity } = useShoppingCart();

  return (
    <div>
      <nav>
        <img src={logo} alt="" />
        <div className="searchbar">
          <input type="text" placeholder="Rechercher" />
          <span className="search-icon">
            <GiMagnifyingGlass />
          </span>
        </div>
        <ul>
          <li>
            <Link to="/">Nouveautés</Link>
          </li>
          <li>
            <Link to="/Men">Hommes</Link>
          </li>
          <li>
            <Link to="/Women">Femmes</Link>
          </li>
          <li className="cart-icon">
            <Link to="/Cart">
              <FaOpencart />
            </Link>
            {cartQuantity > 0 && <div className="count">{cartQuantity}</div>}
          </li>
        </ul>
      </nav>
    </div>
  );
}
