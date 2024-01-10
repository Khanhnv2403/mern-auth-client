import React, { useState } from "react";
import Layout from "../core/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { isAuth } from "../auth/Helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Reset = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    token: "",
    name: "",
    newPassword: "",
    buttonText: "Request password reset link",
  });

  const getToken = useParams();
  const decodedToken = jwtDecode(getToken.token);

  useEffect(() => {
    if (decodedToken) {
      const { name } = decodedToken;
      const token = getToken.token;
      if (getToken.token) {
        setValues({ ...values, name, token });
      }
    }
  }, [decodedToken, getToken.token]);

  const { token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((res) => {
        console.log("Reset password success: ", res);
        toast.success(res.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch((error) => {
        console.log("Reset password error: ", error.response.data);
        setValues({ ...values, buttonText: "Reset password" });
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    const isAuthenticated = isAuth();
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const paswordResetForm = () => (
    <form action="">
      <div className="form-group">
        <label htmlFor="" className="text-nuted">
          New Password
        </label>
        <input
          value={newPassword}
          type="password"
          className="form-control"
          onChange={handleChange}
          placeholder="Type new password"
          required
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
        <h1 className="p-5">Reset password</h1>
        {paswordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
