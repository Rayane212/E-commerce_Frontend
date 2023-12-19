import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../App.css";
import "./Navbar.css";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa";
import logo from "../../assets/images/Sneaker-removebg-preview.png";

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
              <FaOpencart />
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
