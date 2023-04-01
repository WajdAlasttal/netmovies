import React, { useState } from "react";
import style from './Signup.module.css';
import axios from 'axios';
import Joi from "joi";
import {useNavigate} from 'react-router-dom';

export default function Signup() {
    let navigate = useNavigate();
    let [errorList, setErrorList] = useState([]);
    let [user, setUser] = useState({
        name: "",
        email: "",
        password: "" 
      });
      function getUserData(e) {
        let myUser = user;
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        console.log(myUser);
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
         let {data}= await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup',user);
         if(data.message==='success'){
          navigate('/signin');
         }
          console.log(data);
        }
      }
      function validationRegister(user) {
        let schema = Joi.object({
          name: Joi.string().min(3).max(20).required(),
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
          cPassword: Joi.valid(Joi.ref('password')).required(),
        });
        return schema.validate(user, { abortEarly: false });
      }

  return (
    <div>
      <div className={`${style.signup} d-flex`}>
        <div className={`${style.notesPanel}`}>
          <div className={`${style.header}`}>
            <h3>Benefits of being a member</h3>
          </div>
          <ul className={`${style.notes}`}>
            <li className={`${style.notelist}`}>
               Find something to watch on your subscribed streaming services
            </li>
            <li className={`${style.notelist}`}>Log the movies and TV shows you have watched</li>
            <li className={`${style.notelist}`}>
               Keep track of your favourite movies and TV shows and get
              recommendations from them
            </li>
            <li className={`${style.notelist}`}> Build and maintain a personal watchlist</li>
            <li className={`${style.notelist}`}> Build custom mixed lists (movies and TV)</li>
            <li className={`${style.notelist}`}> Take part in movie and TV discussions</li>
          </ul>
        </div>
        <div className={`${style.signupform} w-75`}>
            <div className={``}>
                <h3 className={`${style.signupheader}`}>Sign up for an account</h3>
                <p>Signing up for an account is free and easy. Fill out the form below to get started.</p>
            </div>
            {errorList.map((err, index) => (
        <div className="alert alert-danger">{err.message}</div>
         ))}
        <form onSubmit={submitRegister} >
          <div className="form-group mb-3">
            <label htmlFor="name">Username</label>
            <input type="text" className="form-control" id="name" name="name" onChange={getUserData} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password(4 characters minimum)</label>
            <input type="password" className="form-control" id="password" name="password" onChange={getUserData} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmpassword">Password Confirmation</label>
            <input type="password" className="form-control" id="confirmpassword" name="cPassword" onChange={getUserData} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={getUserData} />
          </div>
          <p>By clicking the "Sign up" button below, I certify that I have read and agree to the NetMovies terms of use and privacy policy.</p>
          <button type="submit" className={`${style.signupbtn}`}>
            Sign Up
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
