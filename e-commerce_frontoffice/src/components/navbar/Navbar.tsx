import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import "../../App.css";
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
          <span className="search-icon" onClick={() => {
            console.log("search");
           }}><GiMagnifyingGlass /></span>
        </div>
        <ul>
          <li>
            <NavLink to="/">Nouveautés</NavLink>
          </li>
          <li>
            <NavLink to="/Men">Hommes</NavLink>
          </li>
          <li>
            <NavLink to="/Women">Femmes</NavLink>
          </li>
          <li >
            <NavLink className="cart-icon" to="/Cart">
              <FaOpencart />
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
