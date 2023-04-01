import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from './Details.module.css';
import image from '../../images/noimage.jpg';

export default function TrendingMovies() {
    let [details, setDetails] = useState("");
    let params = useParams();
    console.log(params);
    let getDetails = async () => {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=c2db102a90b57fa5e0517e57a07ffe3f&language=en-US`
      );
      console.log(data);
      setDetails(data);
    };
    useEffect(() => {
      getDetails();
    }, []);
  
    let backgroundImage =
      "https://image.tmdb.org/t/p/w500" + details.backdrop_path;
    return (
      <div>
        <div className="container py-3">
          <div
            className="overlay"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "10px",
              backgroundPosition: "center",
              color: "#fff",
            }}
          >
            <div
              className={`${style.details} d-flex`}
              style={{
                backgroundColor: "rgba(37,36,36,0.7)",
                borderRadius: "10px",
              }}
            >
              <div className="pe-3">
                <img
                  src={details.poster_path ? "https://image.tmdb.org/t/p/w500" + details.poster_path : image}
                  alt={details.title}
                  width="280"
                  height="450"
                  className="rounded"
                />
              </div>
              <div className={`${style.text}`}>
                <h2 className="pt-5"style={{
                    fontWeight:'700'
                  }}>{params.name}</h2>
                  <p style={{
                    fontWeight:'300'
                  }} >
                  Released in {details.release_date} • {details.runtime} mintues  <br/><br/>
                  {details.tagline} <br/><br/>
                  </p>
                  <h3
                  style={{
                    fontWeight:'700'
                  }}>Overview</h3>
                  <p>{details.overview ? details.overview : "No overview available"}</p>
                  
                <div className={`${style.buttons} d-flex pt-4`}>
                <span className={`${style.buttn} border-success rounded bg-success p-2 me-2`}>Rate it!<i className="fa-solid fa-star fa-sm  px-2 " style={{color: '#fff' }} /></span>
                <span className={`${style.buttn} border-success rounded bg-success p-2 me-2`}>Add to your watchList<i className="fa-solid fa-bookmark fa-sm px-2" style={{color: '#ffffff'}} /></span>
                <span className={`${style.buttn} border-success rounded bg-success p-2 `}>Make as Favorite<i className="fa-sharp fa-solid fa-heart fa-sm  px-2 " style={{color: '#fff' }} /></span>
                </div>
    
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
