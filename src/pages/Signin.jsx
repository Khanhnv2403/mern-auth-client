import React, { useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authenticate, isAuth } from "../auth/Helpers";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Google from "../auth/Google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "khanhkhung0303@gmail.com",
    password: "abc123",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? navigate("/admin")
        : navigate("/private");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((res) => {
        console.log("Signin success: ", res);
        authenticate(res, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          toast.success(`Hi ${res.data.user.name}, Welcome back`);
          isAuth() && isAuth().role === "admin"
            ? navigate("/admin")
            : navigate("/private");
        });
      })
      .catch((error) => {
        console.log("Signin error: ", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    const isAuthenticated = isAuth();
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const signinForm = () => (
    <form action="" className="mt-3">
      <div className="form-group">
        <label htmlFor="" className="text-nuted">
          Email
        </label>
        <input
          value={email}
          type="email"
          className="form-control"
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-nuted">
          Password
        </label>
        <input
          value={password}
          type="password"
          className="form-control"
          onChange={handleChange("password")}
        />
      </div>
      <div>
        <button className="btn btn-primary mt-3" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5">Signin</h1>
        <GoogleOAuthProvider clientId="622285992905-d242purie8rtmj41fh5pm8jcrqrm4dhj.apps.googleusercontent.com">
          <Google informParent={informParent} />
        </GoogleOAuthProvider>
        {signinForm()}
        <br />
        <Link
          to="/auth/password/forgot"
          className="btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center"
        >
          Forgot password?
        </Link>
      </div>
    </Layout>
  );
};

export default Signin;
