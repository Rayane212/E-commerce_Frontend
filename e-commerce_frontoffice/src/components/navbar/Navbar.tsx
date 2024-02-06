import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa";
import logo from "../../assets/Images/Sneaker-removebg-preview.png";

export default function Navbar() {
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
            <div className="count">3</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
