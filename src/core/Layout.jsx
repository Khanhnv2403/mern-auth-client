// core/Layout.jsx
import React, { Fragment } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
