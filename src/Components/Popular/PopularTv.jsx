import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Popular.module.css";
import { Link } from 'react-router-dom'; 
import image from '../../images/noimage.jpg';

export default function PopularTv() {
  let [popular, setPopular] = useState([]);
  let getPopular = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=c2db102a90b57fa5e0517e57a07ffe3f&language=en-US&page=1"
    );
    console.log(data.results);
    setPopular(data.results);
  };
  useEffect(() => {
    getPopular();
  }, []);
  return (
    <div className="px-5 pt-3">
       <h3 className={`${style.header} pb-2`}>Most Popular TvShows</h3>
      <div className={`${style.popular}`}>
        {popular.map((pop,index) => {
          return (
            <div key={index} className={`${style.slide}`}>
               <div className={`position-relative`}> 
                <Link to={`/tvshows/${pop.name}/${pop.id}`}><img src={pop.poster_path ? "https://image.tmdb.org/t/p/w500" + pop.poster_path : image} alt={pop.name}  className="rounded" width="200" height="250" />
               <div className={`${style.rate} d-flex align-items-center`}><i className="fas fa-star pe-1" style={{fontSize:"10px"}}></i>{pop.vote_average}</div>
               </Link>
                </div>
              <div className="text">
                <h3>{pop.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}