import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SearchMovieResults from '../Search/SearchMovieResults';
import image from '../../images/noimage.jpg';

export default function Movies(props) {
    const results = props.results;
    console.log(results);

    const[movies,setMovies] = useState([]);
    const getMovies = async()=>{
        let {data} = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c2db102a90b57fa5e0517e57a07ffe3f');
        setMovies(data.results);
    }
    useEffect(()=>{
        getMovies();
    },[]);
  return (
    <>
    <div className='container py-3'>
    <div className="row">  
    {(results.length == 0)? movies.map((movie)=>{
      return(
         <div key={movie.id} className='col-sm text-center'>
            <Link to={`/movies/${movie.title}/${movie.id}`}><img src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500'+ movie.poster_path : image } alt={movie.title} width="200" height="250" className="rounded"/></Link>
            <h3>{movie.title}</h3>
       </div>
      );  
    }): <SearchMovieResults  results={results}/>} 
    </div>
    </div>
    </>
  
  )
}
