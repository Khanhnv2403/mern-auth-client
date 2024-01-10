import React from "react";
import Layout from "../core/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="col-md-6 offset-md-3 mt-3">
          React Node MongoDB Authentication
        </h1>
        <h2>MERN STACK</h2>
        <hr />
        <p className="lead">
          MERN stack login register system with account activation, login with
          facebook and google as well as private and protected routes for
          authenticated user and users with the role of admin.
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;
