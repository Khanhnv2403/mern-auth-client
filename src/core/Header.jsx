import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { isAuth, signout } from "../pages/auth/Helpers";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        {!isAuth() ? (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive("/signup")}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive("/signin")}
              >
                Signin
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={
                  isAuth() && isAuth().role === "admin" ? "/admin" : "/private"
                }
                style={isActive(
                  isAuth() && isAuth().role === "admin" ? "/admin" : "/private"
                )}
              >
                {isAuth() && isAuth().name}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => {
                  signout();
                }}
                to="/"
                style={{ cursor: "pointer", color: "#fff" }}
              >
                Signout
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Header;
