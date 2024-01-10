import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import Layout from "../core/Layout";

const Activate = () => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  const { token } = useParams();
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken) {
      const { name } = decodedToken;
      if (token) {
        setValues({ ...values, name, token });
      }
    }
  }, [decodedToken, token]);

  // const { name, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((res) => {
        console.log("account activate success: ", res);
        setValues({
          ...values,
          show: false,
        });
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log("account activate error: ", error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div>
      <h1 className="p-5 text-center">
        Hi {values.name}, ready to active your account?
      </h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
