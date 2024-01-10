import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authenticate, isAuth } from "../auth/Helpers";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Google = ({ informParent = (f) => f }) => {
  return (
    <div className="">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("credentialResponse: ", credentialResponse);
          let decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
          axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/google-login`,
            data: { idToken: credentialResponse.credential },
          })
            .then((response) => {
              console.log("google signin success: ", response);
              informParent(response);
            })
            .catch((err) => {
              console.log("err: ", err);
            });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Google;
