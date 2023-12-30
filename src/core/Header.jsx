import React from "react";
import { useHistory, useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const Header = () => {
  const location = useLocation();

  const isActive = (path) => ({
    color: location.pathname === path ? "#000" : "#fff",
  });
  return (
    <>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive("/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" style={isActive("/signup")}>
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin" style={isActive("/signin")}>
            Signin
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
