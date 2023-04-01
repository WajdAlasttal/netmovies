import React, { useState } from "react";
import style from "./Signin.module.css";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();
  let [errorList, setErrorList] = useState([]);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function getUserData(e) {
    let myUser = user;
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function submitRegister(e) {
    e.preventDefault();
    let resultValidation = validationRegister(user);
    if (resultValidation.error) {
      //list error
      console.log(resultValidation);
      setErrorList(resultValidation.error.details);
    } else {
      //go to backend
      let { data } = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
        user
      );
      console.log(data);
      if (data.message === "success") {
        console.log(data);
        localStorage.setItem("userToken", data.token);
        navigate("/home");
      }
    }
  }
  function validationRegister(user) {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .messages({
          "string.pattern.base": "invalid password pattern",
          "string.empty": "password is empty",
        }),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <div className={`${style.signin} px-5 py-5`}>
      <div className="signinheader">
        <h3>Login to your account</h3>
        <p>
          In order to use the editing and rating capabilities of NetMovies, as well
          as get personal recommendations you will need to login to your
          account. If you do not have an account, registering for an account is
          free and simple.{" "}
          <Link className={`${style.clickhere}`} to={"/signup"}>
            Click here
          </Link>{" "}
          to get started.
          <br />
          <br />
          If you signed up but didn't get your verification email,
          <Link className={`${style.clickhere}`}>click here</Link> to have it
          resent.
        </p>
      </div>
      {errorList &&
        errorList.map((err, index) => (
          <div className="alert alert-danger">{err.message}</div>
        ))}

      <form onSubmit={submitRegister}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={getUserData}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={getUserData}
          />
        </div>
        <button type="submit" className={`${style.signinbtn}`}>
          Login
        </button>
      </form>
    </div>
  );
}
