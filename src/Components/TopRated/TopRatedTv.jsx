import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../Popular/Popular.module.css";
import { Link } from "react-router-dom";


export default function UpComingTv() {
    let [coming, setComing] = useState([]);
    let getComing = async () => {
      let { data } = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=c2db102a90b57fa5e0517e57a07ffe3f&language=en-US&page=1"
      );
      setComing(data.results);
    };
    useEffect(() => {
      getComing();
    }, []);
    return (
      <div className="px-5 pt-3">
        <h3 className={`${style.header} pb-2`}>Top Rated TvShows </h3>
        <div className={`${style.popular}`}>
          {coming.map((comings, index) => {
            return (
              <div key={index} className={`${style.slide}`}>
                <div className={`position-relative`}> 
                <Link to={`/tvshows/${comings.name}/${comings.id}`}><img src={"https://image.tmdb.org/t/p/w500" + comings.poster_path} alt={comings.name}  className="rounded" width="200" height="250" />
               <div className={`${style.rate} d-flex align-items-center`}><i className="fas fa-star pe-1" style={{fontSize:"10px"}}></i>{comings.vote_average}</div>
               </Link>
                </div>
                <div className="text">
                  <h3>{comings.name}</h3>
                  <p>{comings.release_date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }