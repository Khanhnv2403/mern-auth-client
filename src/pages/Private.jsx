import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "../core/Layout";
import { useEffect } from "react";
import { getCookie, isAuth, signout, updateUser } from "../auth/Helpers";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("private profile load: ", res);
        const { role, name, email } = res.data.usersInfo;
        setValues({ ...values, role, name, email });
      })
      .catch((err) => {
        console.log("err porfile update: ", err.response);
        if (err.response.status === 401) {
          signout(() => {
            navigate("/");
          });
        }
      });
  };

  const { role, name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((res) => {
        console.log("Profile update success: ", res);
        updateUser(res, () => {
          setValues({
            ...values,
            buttonText: "Submitted",
          });
          toast.success("Profile updated successfully");
        });
      })
      .catch((error) => {
        console.log("Profile update error: ", error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response);
      });
  };

  const updateForm = () => (
    <form action="">
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Role
        </label>
        <input
          defaultValue={role}
          type="text"
          className="form-control"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
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
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          defaultValue={email}
          type="email"
          className="form-control"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
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
        <h1 className="pt-5 text-center">Private</h1>
        <p className="lead text-center">Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
