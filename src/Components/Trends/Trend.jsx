import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Trend() {
  let [trends, setTrend] = useState([]);
  let getTrend = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=c2db102a90b57fa5e0517e57a07ffe3f"
    );
    setTrend(data.results);
  };
  useEffect(() => {
    getTrend();
  }, []);

  return (
    <>
    <div className='container py-3'>
    <div className="row">  
    {trends.map((trend)=>{
      return(
         <div key={trend.id} className='col-sm text-center'>
            <Link to={`/trending/movies/${trend.title}/${trend.id}`}><img src={'https://image.tmdb.org/t/p/w500'+ trend.poster_path } alt={trend.title} width="200" height="250" className="rounded"/></Link>
            <h3>{trend.title}{trend.name}</h3>
       </div>
      );  
    })} 
    </div>
    </div>
    </>
  );
}
  // <div className={`${style.trending} px-5 pt-4`}>
    //   <h3 className={`${style.header} pb-2`}>Trending Now</h3>
    //   <div className={`${style.slider}`}>
    //     {trends.map((trend) => {
    //       return (
    //         <div className={`${style.slide}`}>
    //           <img
    //             src={"https://image.tmdb.org/t/p/w500" + trend.backdrop_path}
    //             alt={trend.title}
    //             className="rounded" width="300" height="200"
    //           />
    //           <div className={`text`}>
    //             <h3>{trend.title}{trend.name}</h3>
    //             <p>{trend.release_date}{trend.first_air_date}</p>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
