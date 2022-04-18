import React from "react";
import { Link } from "react-router-dom";
import { logo } from "./logo.jpg";
const NavBar = () => {
  return (
    <header className="header">
      <div className="header__container">
        <span className="header__logo"> </span>
        <Link to="favourite">
          <img src="" alt="" srcset="" />{" "}
        </Link>

        <span className="header__button">
          <i className="fas fa-bars"></i>
        </span>
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="favourite">My Recipe</Link>
          <Link to="favourite">Grocery</Link>
          <Link to="favourite">Planner</Link>
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
