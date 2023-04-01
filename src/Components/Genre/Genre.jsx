import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from '../Navbar/Navbar.module.css';
import { Link } from "react-router-dom";
export default function () {
    let [genres,setGenres]= useState([]);
    let getGenres = async()=>{
        let {data} = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c2db102a90b57fa5e0517e57a07ffe3f&language=en-US');
        setGenres(data.genres);
    }

    useEffect(()=>{
        getGenres();
    },[]);

  return (
    <div className={`${style.dropdown}`}>
                <button className={`${style.dropbtn}`}>Genre</button>
                <div className={`${style.dropdowncontent}`}>
                <ul>
                {genres.map((genre,index)=>{
                   return (
                    <li key={index}>
                    <Link id={genre.id} to={`/genre/${genre.name}/${genre.id}`}>{genre.name}</Link>
                    </li>

                    );
                })} 
                </ul>
                </div>
              </div>
  )
}
