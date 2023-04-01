import React from "react";
import { Link } from "react-router-dom";
import Genre from "../Genre/Genre";
import style from "./Navbar.module.css";

export default function Navbar(props) {
  const handleInputChange = props.handleInputChange;
  const query = props.query;
  // let handleSubmit=(e)=>{
  //   e.preventDefault();
  // }
  return (
    <>
      <nav className={`navbar ${style.navbar} navbar-expand-lg px-5`}>
        <Link className={`${style.logo}`} to={"/home"}>
          NetMovies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ms-4">
              <Link className={`nav-link ${style.navlink}`} to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link className={`nav-link ${style.navlink}`} to="/tvshows">
                TV Shows
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link className={`nav-link ${style.navlink}`} to="/trending">
                Trending
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Genre />
            </li>
            <li className="nav-item ms-4">
              <Link className={`nav-link ${style.navlink}`} to="/people">
                People
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-4">
              <Link className={`nav-link ${style.navlink}`} to={"/signin"}>
                Login
              </Link>
            </li>
            <li className="nav-item ms-4">
              <Link className={`nav-link ${style.navlink}`} to={"/signup"}>
                JoinUs
              </Link>
            </li>

            {/* <li className="nav-item ms-4">
              <a className={`nav-link ${style.navlink}`} href="#">
              <i className="fa-solid fa-bell"></i>
              </a>
            </li> */}
            {/* <li className="nav-item ms-4">
              <a className={`nav-link ${style.navlink}`} href="#">
              <span className="border border-white rounded-circle px-2 py-1 bg-danger">W</span>
              </a>
            </li> */}
          </ul>
          <form >
        <div className="ms-3 bg-light rounded">
          <div className="input-group">
            <input
              type="search"
              placeholder="Search"
              name="moviename"
              value={query}
              onChange={handleInputChange}
              className="form-control border-0 bg-light"
              style={{fontSize:"15px"}}
            />
            <div className="input-group-append">
                <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
                >
                <i className="fa fa-search " style={{ color: "#710808" }} />
              </button>
            </div>
          </div>
        </div>
      </form>
        </div>
      </nav>
    </>
  );
}
