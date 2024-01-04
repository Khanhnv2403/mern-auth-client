import React from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "./Helpers";

const AdminRoute = ({ children }) => {
  return isAuth() && isAuth().role === "admin" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default AdminRoute;
