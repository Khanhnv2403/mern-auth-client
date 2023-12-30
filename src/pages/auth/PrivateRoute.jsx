import React from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "./Helpers";

const PrivateRoute = ({ children }) => {
  return isAuth() ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
