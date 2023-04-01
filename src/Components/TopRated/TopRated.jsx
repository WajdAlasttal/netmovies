import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../Popular/Popular.module.css";
import { Link } from "react-router-dom";

export default function TopRated() {
    let [top, setTop] = useState([]);
    let getTop = async () => {
      let { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=c2db102a90b57fa5e0517e57a07ffe3f&language=en-US&page=1"
      );
      setTop(data.results);
    };
    useEffect(() => {
      getTop();
    }, []);
  return (
    <div className="px-5 pt-3">
    <h3 className={`${style.header} pb-2`}>Top Rated Movies</h3>
   <div className={`${style.popular}`}>
     {top.map((top,index) => {
       return (
         <div key={index} className={`${style.slide}`}>
           <div className={`position-relative`}> 
                <Link to={`/movies/${top.title}/${top.id}`}><img src={"https://image.tmdb.org/t/p/w500" + top.poster_path} alt={top.title}  className="rounded" width="200" height="250" />
               <div className={`${style.rate} d-flex align-items-center`}><i className="fas fa-star pe-1" style={{fontSize:"10px"}}></i>{top.vote_average}</div>
               </Link>
                </div>
            
           <div className="text">
             <h3>{top.title}</h3>
             <p>{top.release_date}</p>
           </div>
         </div>
       );
     })}
   </div>
 </div>
  )
}
