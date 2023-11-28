import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../App.css";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Images/Sneaker-removebg-preview.png";

export default function Navbar() {
  return (
    <div>
      <nav>
        <img src={logo} alt="" />
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
          <li>
            <Link to="/Cart">
              {" "}
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
