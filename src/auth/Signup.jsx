import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "../core/Layout";

const Signup = () => {
  const [values, setValues] = useState({
    name: "Kevin",
    email: "ngvietkhanh91@gmail.com",
    password: "abc",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((res) => {
        console.log("Signup success: ", res);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log("Signup error: ", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form action="">
      <div className="form-group">
        <label htmlFor="" className="text-nuted">
          Name
        </label>
        <input
          value={name}
          type="text"
          className="form-control"
          onChange={handleChange("name")}
        />
      </div>
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
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5">Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
