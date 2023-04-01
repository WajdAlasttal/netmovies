import React, { useEffect, useState } from "react";
import style from './Home.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import { Link } from "react-router-dom";
import Popular from "../Popular/Popular";
import TopRated from "../TopRated/TopRated";
import UpComing from "../UpComing/UpComing";
import PopularTv from "../Popular/PopularTv";
import TopRatedTv from "../TopRated/TopRatedTv";

export default function Home() {
  const [movies,setmovies] =useState([]);
  const getNowPlaying = async()=>{
    let {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=c2db102a90b57fa5e0517e57a07ffe3f&language=en-US&page=1');
    setmovies(data.results);
  }
  useEffect(()=>{
    getNowPlaying();
  },[])
  return (
   <>
    <div className="posters">
      <Carousel
      autoPlay={true}
      showThumbs={false}
      transitionTime={3}
      infiniteLoop={true}
      showStatus={false}
      showIndicators={false}
      >
      {movies.map(
        movie =>(
         <div key={movie.id}>
            <Link className="text-decoration-none " to={`/movies/${movie.title}/${movie.id}`} > 
          <div className={`${style.imagecontainer} position-relative`} >
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} height="500" />
            <div className={`${style.overlay} px-5`} style={{textAlign:"left" , color:"#fff" }}>
            <div className="posterTitle w-25 pb-3" style={{fontSize:"36px", fontWeight:"700", lineHeight:"1"}}>
              {movie ? movie.title:""}
            </div>
            <div className="rating pb-2" style={{fontSize:"15px"}}>
            <span className="border rounded px-2">{movie ? movie.release_date:""}</span>{" • "}
            <span className="border rounded px-2">{movie ? movie.vote_average:""}{" "}<i className="fas fa-star "></i>{" "}</span>
            </div>
            <div className="desc w-75" style={{fontSize:"16px"}}>
            {movie ? movie.overview:""}
            </div>
          </div>
          </div>
          </Link>
         </div>
         
        )   
        
      )}
      </Carousel>
    </div>
    <Popular/>
    <TopRated/>
    <UpComing/>
    <PopularTv/>
    <TopRatedTv />
    </>
  );
}
