import React, { useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authenticate, isAuth } from "../auth/Helpers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Forgot = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((res) => {
        console.log("Forgot success: ", res);
        toast.success(res.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch((error) => {
        console.log("Forgot error: ", error.response.data);
        setValues({ ...values, buttonText: "Request password reset link" });
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    const isAuthenticated = isAuth();
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const forgotForm = () => (
    <form action="">
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
        <h1 className="p-5">Forgot password</h1>
        {forgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
