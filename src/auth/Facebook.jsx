import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authenticate, isAuth } from "./Helpers";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Facebook = ({ informParent = (f) => f }) => {
  return (
    <div className="">
      <FacebookLogin
        onSuccess={(credentialResponse) => {
          console.log("credentialResponse: ", credentialResponse);
          let decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
          axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { idToken: credentialResponse.credential },
          })
            .then((response) => {
              console.log("Facebook signin success: ", response);
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

export default Facebook;
