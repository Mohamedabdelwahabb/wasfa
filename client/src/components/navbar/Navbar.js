import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
//!
import { ThemeContext } from "../../context/ThemeContext";
//!
import classes from "./navbar.css";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "@mui/material";
//!
const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("theme"));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <header className="header">
      <div className="container">
        <span className="logo">WASFA</span>
        <nav className="main-nav">
          <ul className="nav-container">
            <li className="nav-item">
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navData) => (navData.isActive ? "active" : "")}
                to="/favorite"
              >
                My Recipe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navData) => (navData.isActive ? "active" : "")}
                to="/grocery"
              >
                Grocery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navData) => (navData.isActive ? "active" : "")}
                to="/planner"
              >
                Planner
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink to="">
                log in
                <LoginIcon />
              </NavLink>
            </li> */}
          </ul>
        </nav>
        <div className="icon">
          <span className="nav-item">
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </Button>
          </span>

          <span className="nav-item">
            <Button>
              <ShoppingCartOutlinedIcon />
            </Button>
          </span>
          <span className="nav-item">
            <Button>
              <PermIdentityIcon />
            </Button>
          </span>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
