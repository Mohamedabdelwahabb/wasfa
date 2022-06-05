import { NavLink } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import classes from "./navbar.scss";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Button } from "@mui/material";
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
            <li className="nav-item">
              <Button
                sx={{ color: "white" }}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <DarkModeOutlinedIcon />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
